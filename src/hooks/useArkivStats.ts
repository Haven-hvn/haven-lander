/**
 * useArkivStats Hook
 * Fetches and manages Arkiv Network data usage statistics
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  fetchArkivDataUsage,
  ArkivDataUsage,
} from '@/services/arkivService';

export interface ArkivStatsState {
  data: ArkivDataUsage;
  isLoading: boolean;
  error: string | null;
  lastFetchTime: Date | null;
}

export interface UseArkivStatsOptions {
  /** Number of days to fetch (default: 30) */
  days?: number;
  /** Whether to use cached data (default: true) */
  useCache?: boolean;
  /** Polling interval in milliseconds (default: 1 hour) */
  pollInterval?: number;
  /** Whether to enable polling (default: true) */
  enablePolling?: boolean;
}

const DEFAULT_OPTIONS: UseArkivStatsOptions = {
  days: 30,
  useCache: true,
  pollInterval: 60 * 60 * 1000, // 1 hour
  enablePolling: true,
};

const initialData: ArkivDataUsage = {
  totalGB: 0,
  dailyData: [],
  avgDailyGrowthGB: 0,
  totalGrowth30DaysGB: 0,
  lastUpdated: new Date(),
};

/**
 * Hook for fetching Arkiv Network statistics
 */
export function useArkivStats(
  options: UseArkivStatsOptions = {}
): ArkivStatsState & {
  refetch: () => Promise<void>;
  retry: () => Promise<void>;
} {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  const [state, setState] = useState<ArkivStatsState>({
    data: initialData,
    isLoading: true,
    error: null,
    lastFetchTime: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const pollingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchData = useCallback(async (showLoading = true) => {
    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    if (showLoading) {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
    }

    try {
      const data = await fetchArkivDataUsage(opts.days, opts.useCache);
      
      setState({
        data,
        isLoading: false,
        error: null,
        lastFetchTime: new Date(),
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('[useArkivStats] Fetch error:', errorMessage);
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
        lastFetchTime: new Date(),
      }));
    }
  }, [opts.days, opts.useCache]);

  const refetch = useCallback(async () => {
    await fetchData(true);
  }, [fetchData]);

  const retry = useCallback(async () => {
    // Clear error and retry with loading state
    setState(prev => ({ ...prev, error: null, isLoading: true }));
    await fetchData(true);
  }, [fetchData]);

  // Initial fetch
  useEffect(() => {
    fetchData(true);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (pollingTimeoutRef.current) {
        clearTimeout(pollingTimeoutRef.current);
      }
    };
  }, [fetchData]);

  // Polling
  useEffect(() => {
    if (!opts.enablePolling || !opts.pollInterval) return;

    const scheduleNextPoll = () => {
      pollingTimeoutRef.current = setTimeout(() => {
        fetchData(false).then(scheduleNextPoll);
      }, opts.pollInterval);
    };

    scheduleNextPoll();

    return () => {
      if (pollingTimeoutRef.current) {
        clearTimeout(pollingTimeoutRef.current);
      }
    };
  }, [fetchData, opts.enablePolling, opts.pollInterval]);

  return {
    ...state,
    refetch,
    retry,
  };
}

export default useArkivStats;
