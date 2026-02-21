/**
 * Arkiv Network Service
 * Provides data usage statistics from Arkiv Network
 * 
 * API Endpoint: https://explorer.mendoza.hoodi.arkiv.network/arkiv-indexer/api/v1/chart/data-usage
 */

// Types
export interface ArkivDataPoint {
  date: string;
  date_to: string;
  value: number; // bytes (cumulative)
  dailyGrowthBytes: number; // bytes added that day
  dailyGrowthGB: number;
  gb: number; // cumulative GB
}

export interface ArkivDataUsage {
  totalGB: number;
  dailyData: ArkivDataPoint[];
  avgDailyGrowthGB: number; // Average daily growth in GB
  totalGrowth30DaysGB: number; // Total growth over the period
  lastUpdated: Date;
}

export interface ArkivServiceConfig {
  baseUrl: string;
  timeout: number;
}

// Default configuration
const DEFAULT_CONFIG: ArkivServiceConfig = {
  baseUrl: 'https://explorer.mendoza.hoodi.arkiv.network/arkiv-indexer/api/v1',
  timeout: 30000,
};

// Cache
interface CacheEntry {
  data: ArkivDataUsage;
  timestamp: number;
}

let cache: CacheEntry | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

/**
 * Fetch data usage from Arkiv Network
 * @param days Number of days to fetch (default: 30)
 * @param useCache Whether to use cached data
 * @returns Promise<ArkivDataUsage>
 */
export async function fetchArkivDataUsage(
  days: number = 30,
  useCache: boolean = true,
  config: Partial<ArkivServiceConfig> = {}
): Promise<ArkivDataUsage> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  // Check cache
  if (useCache && cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    console.log('[ArkivService] Returning cached data');
    return cache.data;
  }

  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);
  
  const from = startDate.toISOString().split('T')[0];
  const to = endDate.toISOString().split('T')[0];

  const url = `${finalConfig.baseUrl}/chart/data-usage?from=${from}&to=${to}&resolution=DAY`;

  console.log(`[ArkivService] Fetching from: ${url}`);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), finalConfig.timeout);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('[ArkivService] Response received:', data.chart?.length, 'days');

    const parsed = parseChartData(data);
    cache = { data: parsed, timestamp: Date.now() };
    return parsed;

  } catch (error) {
    console.error('[ArkivService] Fetch error:', error);
    throw error;
  }
}

/**
 * Parse chart data response
 * The API returns cumulative values, so we calculate daily growth
 */
function parseChartData(data: any): ArkivDataUsage {
  if (!data?.chart || !Array.isArray(data.chart)) {
    throw new Error('Invalid response format: missing chart array');
  }

  const dailyData: ArkivDataPoint[] = [];
  let previousValue = 0;

  data.chart.forEach((day: any, index: number) => {
    const currentValue = parseInt(day.value, 10) || 0;
    
    // Calculate daily growth (difference from previous day)
    // First day we can't calculate growth, so use 0
    const dailyGrowthBytes = index === 0 ? 0 : currentValue - previousValue;
    previousValue = currentValue;

    dailyData.push({
      date: day.date,
      date_to: day.date_to,
      value: currentValue,
      dailyGrowthBytes,
      dailyGrowthGB: dailyGrowthBytes / (1024 * 1024 * 1024),
      gb: currentValue / (1024 * 1024 * 1024),
    });
  });

  // Total is the last cumulative value
  const totalGB = dailyData.length > 0 
    ? dailyData[dailyData.length - 1].gb 
    : 0;

  // Calculate average daily growth (excluding first day)
  const growthDays = dailyData.slice(1); // Exclude first day
  const totalGrowthBytes = growthDays.reduce((sum, day) => sum + day.dailyGrowthBytes, 0);
  const avgDailyGrowthGB = growthDays.length > 0 
    ? (totalGrowthBytes / growthDays.length) / (1024 * 1024 * 1024)
    : 0;

  return {
    totalGB: parseFloat(totalGB.toFixed(2)),
    dailyData,
    avgDailyGrowthGB: parseFloat(avgDailyGrowthGB.toFixed(4)),
    totalGrowth30DaysGB: parseFloat((totalGrowthBytes / (1024 * 1024 * 1024)).toFixed(2)),
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

// Default export
const arkivService = {
  fetchArkivDataUsage,
  clearCache,
  getCacheStatus,
};

export default arkivService;
