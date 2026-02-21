/**
 * useLitStats Hook
 * Fetches and manages Lit Protocol metrics using the official SDK
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchLitMetrics, LitMetrics, isConfigured } from '@/services/litService';

export interface LitStatsState {
  data: LitMetrics;
  isLoading: boolean;
  error: string | null;
  lastFetchTime: Date | null;
  isConfigured: boolean;
}

export interface UseLitStatsOptions {
  /** Number of hours to fetch (default: 24) */
  hours?: number;
  /** Whether to use cached data (default: true) */
  useCache?: boolean;
  /** Polling interval in milliseconds (default: 5 minutes) */
  pollInterval?: number;
  /** Whether to enable polling (default: true) */
  enablePolling?: boolean;
}

const DEFAULT_OPTIONS: UseLitStatsOptions = {
  hours: 24,
  useCache: true,
  pollInterval: 5 * 60 * 1000, // 5 minutes
  enablePolling: true,
};

const initialData: LitMetrics = {
  successRate: 0,
  totalExecutions: 0,
  failedExecutions: 0,
  averageResponseTime: 0,
  uptime: 0,
  lastUpdated: new Date(),
};

/**
 * Hook for fetching Lit Protocol statistics
 * Requires VITE_LIT_STATUS_API_KEY to be set
 */
export function useLitStats(
  options: UseLitStatsOptions = {}
): LitStatsState & {
  refetch: () => Promise<void>;
  retry: () => Promise<void>;
} {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  const [state, setState] = useState<LitStatsState>({
    data: initialData,
    isLoading: true,
    error: null,
    lastFetchTime: null,
    isConfigured: isConfigured(),
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
      const data = await fetchLitMetrics(opts.hours, opts.useCache);
      
      setState({
        data,
        isLoading: false,
        error: null,
        lastFetchTime: new Date(),
        isConfigured: true,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('[useLitStats] Fetch error:', errorMessage);
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
        isConfigured: isConfigured(),
      }));
    }
  }, [opts.hours, opts.useCache]);

  const refetch = useCallback(async () => {
    await fetchData(true);
  }, [fetchData]);

  const retry = useCallback(async () => {
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

export default useLitStats;
