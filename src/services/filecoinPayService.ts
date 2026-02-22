/**
 * Filecoin Pay (USDFC) Service
 * Provides token transaction statistics from Filecoin Pay
 * 
 * Subgraph: https://api.goldsky.com/api/public/project_cmb9tuo8r1xdw01ykb8uidk7h/subgraphs/filecoin-pay-mainnet/1.0.6/gn
 * 
 * Token Addresses (Mainnet):
 * - USDFC: 0x80B98d3aa09ffff255c3ba4A241111Ff1262F045
 * - FIL: 0x0000000000000000000000000000000000000000 (native)
 */

// Types
export interface TokenData {
  id: string;
  decimals: string;
  totalSettledAmount: string;
  totalOneTimePayment: string;
  userFunds: string;
  lockupCurrent: string;
  lockupRate: string;
  lockupLastSettledUntilEpoch: string;
}

export interface FilecoinPayMetrics {
  totalUSDFCTransacted: string;
  totalFILTransacted: string;
  totalUSDFCLocked: string;
  totalFILLocked: string;
  usdfcToken: TokenData | null;
  activeStorageDeals: number;
  lastUpdated: Date;
}

export interface FilecoinPayServiceConfig {
  subgraphUrl: string;
  usdfcAddress: string;
  filAddress: string;
  timeout: number;
}

// Default configuration - Mainnet
const DEFAULT_CONFIG: FilecoinPayServiceConfig = {
  subgraphUrl: 'https://api.goldsky.com/api/public/project_cmb9tuo8r1xdw01ykb8uidk7h/subgraphs/filecoin-pay-mainnet/1.0.6/gn',
  usdfcAddress: '0x80B98d3aa09ffff255c3ba4A241111Ff1262F045',
  filAddress: '0x0000000000000000000000000000000000000000',
  timeout: 30000,
};

// Cache
interface CacheEntry {
  data: FilecoinPayMetrics;
  timestamp: number;
}

let cache: CacheEntry | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// GraphQL Query
const GET_STATS_DASHBOARD = `
  query GetStatsDashboard($usdfcAddress: Bytes!, $filAddress: Bytes!) {
    usdfcToken: token(id: $usdfcAddress) {
      decimals
      totalSettledAmount
      totalOneTimePayment
      userFunds
      lockupCurrent
      lockupRate
      lockupLastSettledUntilEpoch
    }
    filToken: token(id: $filAddress) {
      decimals
      totalSettledAmount
      totalOneTimePayment
      userFunds
      lockupCurrent
      lockupRate
      lockupLastSettledUntilEpoch
    }
  }
`;

/**
 * Format token value (assuming 18 decimals)
 */
export function formatTokenValue(value: string | undefined, decimals: number = 18, symbol: string = ''): string {
  if (!value) return `0${symbol ? ' ' + symbol : ''}`;
  
  try {
    const bigValue = BigInt(value);
    const divisor = BigInt(10 ** decimals);
    const integerPart = bigValue / divisor;
    const decimalPart = bigValue % divisor;
    const decimalStr = decimalPart.toString().padStart(decimals, '0');
    
    // Format with 2 decimal places for display
    const trimmedDecimal = decimalStr.slice(0, 2).replace(/0+$/, '');
    const formatted = trimmedDecimal 
      ? `${integerPart.toLocaleString()}.${trimmedDecimal}`
      : integerPart.toLocaleString();
    
    return symbol ? `${formatted} ${symbol}` : formatted;
  } catch (e) {
    return `${value}${symbol ? ' ' + symbol : ''}`;
  }
}

/**
 * Parse raw token value to number
 */
export function parseTokenValue(value: string | undefined, decimals: number = 18): number {
  if (!value) return 0;
  
  try {
    const bigValue = BigInt(value);
    const divisor = BigInt(10 ** decimals);
    return Number(bigValue) / Number(divisor);
  } catch (e) {
    return 0;
  }
}

/**
 * Execute GraphQL query
 */
async function executeQuery<T>(
  query: string,
  variables: Record<string, any>,
  config: FilecoinPayServiceConfig
): Promise<{ data?: T; errors?: any[] }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);

  try {
    const response = await fetch(config.subgraphUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Fetch Filecoin Pay metrics
 * @param useCache Whether to use cached data
 * @returns Promise<FilecoinPayMetrics>
 */
export async function fetchFilecoinPayMetrics(
  useCache: boolean = true,
  config: Partial<FilecoinPayServiceConfig> = {}
): Promise<FilecoinPayMetrics> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  // Check cache
  if (useCache && cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    console.log('[FilecoinPayService] Returning cached data');
    return cache.data;
  }

  try {
    const result = await executeQuery<{
      usdfcToken: TokenData | null;
      filToken: TokenData | null;
    }>(GET_STATS_DASHBOARD, {
      usdfcAddress: finalConfig.usdfcAddress,
      filAddress: finalConfig.filAddress,
    }, finalConfig);

    if (result.errors) {
      console.warn('[FilecoinPayService] GraphQL errors:', result.errors);
      throw new Error('GraphQL query returned errors');
    }

    const { usdfcToken, filToken } = result.data || {};

    // Calculate total transacted (settled + one-time payments)
    const usdfcTotal = usdfcToken 
      ? BigInt(usdfcToken.totalSettledAmount || '0') + BigInt(usdfcToken.totalOneTimePayment || '0')
      : BigInt(0);

    const filTotal = filToken
      ? BigInt(filToken.totalSettledAmount || '0') + BigInt(filToken.totalOneTimePayment || '0')
      : BigInt(0);

    // Active storage deals - estimate from lockup data or use default
    // This could be fetched from a separate query if needed
    const activeStorageDeals = 50; // Placeholder - could be fetched from paymentsMetrics

    const metrics: FilecoinPayMetrics = {
      totalUSDFCTransacted: formatTokenValue(usdfcTotal.toString(), 18),
      totalFILTransacted: formatTokenValue(filTotal.toString(), 18),
      totalUSDFCLocked: usdfcToken 
        ? formatTokenValue(usdfcToken.lockupCurrent, 18)
        : '0',
      totalFILLocked: filToken
        ? formatTokenValue(filToken.lockupCurrent, 18)
        : '0',
      usdfcToken: usdfcToken || null,
      activeStorageDeals,
      lastUpdated: new Date(),
    };

    console.log('[FilecoinPayService] Metrics fetched:', {
      totalUSDFCTransacted: metrics.totalUSDFCTransacted,
      totalUSDFCLocked: metrics.totalUSDFCLocked,
    });

    cache = { data: metrics, timestamp: Date.now() };
    return metrics;

  } catch (error) {
    console.error('[FilecoinPayService] Fetch error:', error);
    throw error; // Let the caller handle the error
  }
}

/**
 * Get mock data for development/testing
 */
export function getMockData(): FilecoinPayMetrics {
  return {
    totalUSDFCTransacted: '54.52',
    totalFILTransacted: '0',
    totalUSDFCLocked: '124.16',
    totalFILLocked: '0',
    usdfcToken: null,
    activeStorageDeals: 50,
    lastUpdated: new Date(),
  };
}

/**
 * Clear the cache
 */
export function clearCache(): void {
  cache = null;
}

/**
 * Get cache status
 */
export function getCacheStatus(): { hasCache: boolean; age?: number } {
  if (!cache) return { hasCache: false };
  return {
    hasCache: true,
    age: Date.now() - cache.timestamp,
  };
}

/**
 * Check if subgraph is available
 */
export async function checkSubgraphHealth(
  config: Partial<FilecoinPayServiceConfig> = {}
): Promise<{ healthy: boolean; message: string }> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  try {
    const result = await executeQuery<{ _meta?: any }>(
      `{ _meta { block { number timestamp } hasIndexingErrors } }`,
      {},
      finalConfig
    );

    if (result.errors) {
      return { healthy: false, message: 'Subgraph returned errors' };
    }

    if (result.data?._meta?.hasIndexingErrors) {
      return { healthy: false, message: 'Subgraph has indexing errors' };
    }

    return { 
      healthy: true, 
      message: `Subgraph is healthy (block ${result.data?._meta?.block?.number})` 
    };

  } catch (error) {
    return { 
      healthy: false, 
      message: `Subgraph unavailable: ${(error as Error).message}` 
    };
  }
}

// Default export
const filecoinPayService = {
  fetchFilecoinPayMetrics,
  getMockData,
  formatTokenValue,
  parseTokenValue,
  clearCache,
  getCacheStatus,
  checkSubgraphHealth,
};

export default filecoinPayService;
