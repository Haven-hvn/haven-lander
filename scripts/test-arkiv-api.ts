/**
 * Test script for Arkiv Network API
 * Endpoint: https://explorer.mendoza.hoodi.arkiv.network/arkiv/indexer/api/v1/chart/data/usage
 */

interface ArkivChartData {
  date: string;
  value: string;
}

interface ArkivApiResponse {
  chart: ArkivChartData[];
}

export interface ArkivDataUsage {
  totalGB: number;
  dailyData: Array<{ date: string; value: number }>;
  lastUpdated: Date;
}

export async function fetchArkivDataUsage(): Promise<ArkivDataUsage> {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000); // Last 30 days

  const from = startDate.toISOString().split('T')[0];
  const to = endDate.toISOString().split('T')[0];

  const url = `https://explorer.mendoza.hoodi.arkiv.network/arkiv/indexer/api/v1/chart/data/usage?from=${from}&to=${to}&resolution=DAY`;

  console.log(`Fetching Arkiv data from: ${url}`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Arkiv API error: ${response.status} ${response.statusText}`);
  }

  const data: ArkivApiResponse = await response.json();
  
  console.log('Arkiv API Response:', JSON.stringify(data, null, 2));

  let totalBytes = 0;
  data.chart.forEach((day: ArkivChartData) => {
    totalBytes += parseInt(day.value, 10);
  });

  const totalGB = totalBytes / (1024 * 1024 * 1024);

  return {
    totalGB: parseFloat(totalGB.toFixed(2)),
    dailyData: data.chart.map((day: ArkivChartData) => ({
      date: day.date,
      value: parseInt(day.value, 10),
    })),
    lastUpdated: new Date(),
  };
}

// Run test if this file is executed directly
if (import.meta.main) {
  console.log('Testing Arkiv Network API...\n');
  
  try {
    const result = await fetchArkivDataUsage();
    console.log('\n✅ Arkiv API Test Success!\n');
    console.log(`Total Data Secured: ${result.totalGB} GB`);
    console.log(`Data Points: ${result.dailyData.length} days`);
    console.log(`Last Updated: ${result.lastUpdated.toISOString()}`);
    console.log('\nDaily Breakdown (first 5):');
    result.dailyData.slice(0, 5).forEach((day) => {
      const gb = (day.value / (1024 * 1024 * 1024)).toFixed(4);
      console.log(`  ${day.date}: ${gb} GB (${day.value} bytes)`);
    });
  } catch (error) {
    console.error('\n❌ Arkiv API Test Failed!\n');
    console.error(error);
    process.exit(1);
  }
}
