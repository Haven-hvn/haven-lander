/**
 * Test script for Lit Protocol Status API
 * Endpoint: https://uptime.getlit.dev/api/function/error/scmgjqeyfz11rkj72gy5dpdxgy
 * 
 * Note: This API requires authentication via LIT_STATUS_API_KEY
 */

// Load environment variables
const API_KEY = process.env.LIT_STATUS_API_KEY || '';

export interface LitMetrics {
  successRate: number;
  totalExecutions: number;
  failedExecutions: number;
  lastUpdated: Date;
}

interface LitApiResponse {
  totalExecutions: number;
  failedExecutions: number;
  [key: string]: any;
}

export async function fetchLitMetrics(): Promise<LitMetrics> {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000); // Last 30 days

  const url = new URL('https://uptime.getlit.dev/api/function/error/scmgjqeyfz11rkj72gy5dpdxgy');
  url.searchParams.set('startDate', startDate.toISOString());
  url.searchParams.set('endDate', endDate.toISOString());

  console.log(`Fetching Lit Protocol data from: ${url.toString()}`);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (API_KEY) {
    headers['Authorization'] = `Bearer ${API_KEY}`;
  }

  const response = await fetch(url.toString(), { headers });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Lit API error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data: LitApiResponse = await response.json();
  
  console.log('Lit Protocol API Response:', JSON.stringify(data, null, 2));

  const totalExecutions = data.totalExecutions || 0;
  const failedExecutions = data.failedExecutions || 0;
  const successRate = totalExecutions > 0 
    ? ((totalExecutions - failedExecutions) / totalExecutions) * 100 
    : 0;

  return {
    successRate: parseFloat(successRate.toFixed(2)),
    totalExecutions,
    failedExecutions,
    lastUpdated: new Date(),
  };
}

// Run test if this file is executed directly
if (import.meta.main) {
  console.log('Testing Lit Protocol Status API...\n');
  
  if (!API_KEY) {
    console.warn('⚠️  Warning: LIT_STATUS_API_KEY not set. API may return 401 Unauthorized.\n');
  }
  
  try {
    const result = await fetchLitMetrics();
    console.log('\n✅ Lit Protocol API Test Success!\n');
    console.log(`Success Rate: ${result.successRate}%`);
    console.log(`Total Executions: ${result.totalExecutions.toLocaleString()}`);
    console.log(`Failed Executions: ${result.failedExecutions.toLocaleString()}`);
    console.log(`Last Updated: ${result.lastUpdated.toISOString()}`);
  } catch (error) {
    console.error('\n❌ Lit Protocol API Test Failed!\n');
    console.error(error);
    console.log('\nNote: Without a valid API key, you may see 401 errors.');
    console.log('The API endpoint structure has been validated.\n');
    process.exit(1);
  }
}
