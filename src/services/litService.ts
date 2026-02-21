/**
 * Lit Protocol Status Service
 * Provides decryption and execution metrics from Lit Protocol
 * 
 * SDK: @lit-protocol/lit-status-sdk
 * Server: https://uptime.getlit.dev
 * Documentation: https://uptime-docs.vercel.app/docs/sdk
 */

import { createLitStatusClient } from '@lit-protocol/lit-status-sdk';

// Hardcoded API key - Lit Protocol status API key
const LIT_STATUS_API_KEY = 'lit_status_ck_2qXF4Yq0X9VqQqGqLqMqQqQqQqQqQqQqQqQqQqQqQqQq';

// Types
export interface LitMetrics {
  successRate: number;
  totalExecutions: number;
  failedExecutions: number;
  averageResponseTime: number;
  uptime: number;
  lastUpdated: Date;
}

export interface LitServiceConfig {
  apiKey?: string;
  apiUrl?: string;
  network: 'naga-dev' | 'naga-test' | 'habanero' | 'manzano';
  product: string;
}

// Default configuration
const DEFAULT_CONFIG: Omit<LitServiceConfig, 'apiKey'> = {
  apiUrl: 'https://uptime.getlit.dev',
  network: 'naga-test',
  product: 'js-sdk/naga',
};

// Cache
interface CacheEntry {
  data: LitMetrics;
  timestamp: number;
}

let cache: CacheEntry | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Initialize the Lit Status client
 */
function initializeClient(config: Partial<LitServiceConfig> = {}) {
  const apiKey = config.apiKey || LIT_STATUS_API_KEY;
  const apiUrl = config.apiUrl || DEFAULT_CONFIG.apiUrl;

  return createLitStatusClient({
    url: apiUrl!,
    apiKey: apiKey!,
  });
}

/**
 * Fetch Lit Protocol metrics using SDK
 * @param hours Number of hours to fetch (default: 24)
 * @param useCache Whether to use cached data
 * @returns Promise<LitMetrics>
 */
export async function fetchLitMetrics(
  hours: number = 24,
  useCache: boolean = true,
  config: Partial<LitServiceConfig> = {}
): Promise<LitMetrics> {
  // Check cache
  if (useCache && cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return cache.data;
  }

  const client = initializeClient(config);
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  // Get or register the decrypt function
  const functions = await client.getOrRegisterFunctions({
    network: finalConfig.network,
    product: finalConfig.product,
    functions: ['decrypt'],
  });

  const decryptFunc = functions['decrypt'];
  if (!decryptFunc?.id) {
    throw new Error('Decrypt function not found in Lit Protocol');
  }

  // Get metrics for the time range
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - hours * 60 * 60 * 1000);

  const metrics = await client.getFunctionMetrics(decryptFunc.id, {
    startDate,
    endDate,
  });

  // Handle SDK response - metrics properties may vary
  const m = metrics as any;
  const result: LitMetrics = {
    successRate: typeof m.successRate === 'string' ? parseFloat(m.successRate) : (m.successRate || 0),
    totalExecutions: m.totalExecutions || 0,
    failedExecutions: m.failedExecutions || 0,
    averageResponseTime: m.averageResponseTime || 0,
    uptime: typeof m.uptime === 'string' ? parseFloat(m.uptime) : (m.uptime || 0),
    lastUpdated: new Date(),
  };

  cache = { data: result, timestamp: Date.now() };
  return result;
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
 * Check if service is available (SDK loaded)
 */
export function isConfigured(): boolean {
  return true; // Always configured with hardcoded key
}

// Default export
const litService = {
  fetchLitMetrics,
  clearCache,
  getCacheStatus,
  isConfigured,
};

export default litService;
