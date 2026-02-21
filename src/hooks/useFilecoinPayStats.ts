/**
 * useFilecoinPayStats Hook
 * Fetches and manages Filecoin Pay (USDFC) metrics
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  fetchFilecoinPayMetrics,
  FilecoinPayMetrics,
  getMockData,
} from '@/services/filecoinPayService';

export interface FilecoinPayStatsState {
  data: FilecoinPayMetrics;
  isLoading: boolean;
  error: string | null;
  lastFetchTime: Date | null;
  isSubgraphReady: boolean;
}

export interface UseFilecoinPayStatsOptions {
  /** Whether to use cached data (default: true) */
  useCache?: boolean;
  /** Polling interval in milliseconds (default: 5 minutes) */
  pollInterval?: number;
  /** Whether to enable polling (default: true) */
  enablePolling?: boolean;
}

const DEFAULT_OPTIONS: UseFilecoinPayStatsOptions = {
  useCache: true,
  pollInterval: 5 * 60 * 1000, // 5 minutes
  enablePolling: true,
};

const initialData: FilecoinPayMetrics = {
  totalUSDFCTransacted: '0',
  totalFILTransacted: '0',
  totalUSDFCLocked: '0',
  totalFILLocked: '0',
  activeStorageDeals: 0,
  lastUpdated: new Date(),
};

/**
 * Hook for fetching Filecoin Pay statistics
 */
export function useFilecoinPayStats(
  options: UseFilecoinPayStatsOptions = {}
): FilecoinPayStatsState & {
  refetch: () => Promise<void>;
  retry: () => Promise<void>;
} {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  const [state, setState] = useState<FilecoinPayStatsState>({
    data: initialData,
    isLoading: true,
    error: null,
    lastFetchTime: null,
    isSubgraphReady: false,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const pollingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      const data = await fetchFilecoinPayMetrics(opts.useCache);
      
      // Check if we're using mock data (subgraph not ready)
      const mockData = getMockData();
      const isMockData = data.totalUSDFCTransacted === mockData.totalUSDFCTransacted &&
                         data.totalFILTransacted === mockData.totalFILTransacted;
      
      setState(prev => ({
        data,
        isLoading: false,
        error: isMockData ? 'Using mock data - subgraph indexing in progress' : null,
        lastFetchTime: new Date(),
        isSubgraphReady: !isMockData,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('[useFilecoinPayStats] Fetch error:', errorMessage);
      
      // Use mock data on error
      const mockData = getMockData();
      
      setState(prev => ({
        ...prev,
        data: mockData,
        isLoading: false,
        error: errorMessage,
        lastFetchTime: new Date(),
        isSubgraphReady: false,
      }));
    }
  }, [opts.useCache]);

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

export default useFilecoinPayStats;
