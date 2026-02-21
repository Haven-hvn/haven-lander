#!/usr/bin/env node
/**
 * Test script for Arkiv Network API
 * Endpoint: https://explorer.mendoza.hoodi.arkiv.network/arkiv-indexer/api/v1/chart/data-usage
 */

const ARKIV_API_URL = 'https://explorer.mendoza.hoodi.arkiv.network/arkiv-indexer/api/v1/chart/data-usage';

async function testArkivAPI() {
  console.log('🧪 Testing Arkiv Network API');
  console.log('=' .repeat(70));

  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const from = startDate.toISOString().split('T')[0];
  const to = endDate.toISOString().split('T')[0];
  
  const url = `${ARKIV_API_URL}?from=${from}&to=${to}&resolution=DAY`;
  console.log(`Fetching from: ${url}`);
  console.log(`Date range: ${from} to ${to}`);
  console.log();

  try {
    const startTime = performance.now();
    const response = await fetch(url);
    const responseTime = Math.round(performance.now() - startTime);

    console.log(`Response Status: ${response.status} ${response.statusText}`);
    console.log(`Response Time: ${responseTime}ms`);
    console.log();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    console.log('Raw Response Structure:');
    console.log(`  Keys: ${Object.keys(data).join(', ')}`);
    console.log(`  Chart entries: ${data.chart?.length || 0}`);
    console.log();

    if (!data.chart || !Array.isArray(data.chart)) {
      throw new Error('Invalid response format - no chart array');
    }

    // Calculate total data usage
    let totalBytes = 0;
    const dailyData = [];

    data.chart.forEach(day => {
      const bytes = parseInt(day.value, 10) || 0;
      totalBytes += bytes;
      dailyData.push({
        date: day.date,
        date_to: day.date_to,
        bytes: bytes,
        gb: (bytes / (1024 * 1024 * 1024)).toFixed(4)
      });
    });

    const totalGB = totalBytes / (1024 * 1024 * 1024);
    const avgDailyGB = totalGB / data.chart.length;
    
    console.log('Calculated Metrics:');
    console.log(`  Total Days: ${data.chart.length}`);
    console.log(`  Total Bytes: ${totalBytes.toLocaleString()}`);
    console.log(`  Total GB: ${totalGB.toFixed(2)} GB`);
    console.log(`  Daily Average: ${avgDailyGB.toFixed(4)} GB`);
    console.log();
    
    console.log('Sample Daily Data (first 3):');
    console.table(dailyData.slice(0, 3));
    
    console.log('Sample Daily Data (last 3):');
    console.table(dailyData.slice(-3));
    console.log();
    
    console.log('✅ Arkiv API Test PASSED');
    
    return {
      success: true,
      totalGB: parseFloat(totalGB.toFixed(2)),
      dailyCount: data.chart.length,
      dailyData,
      lastUpdated: new Date()
    };

  } catch (error) {
    console.error('❌ Arkiv API Test FAILED');
    console.error('Error:', error.message);
    return { success: false, error: error.message };
  }
}

testArkivAPI().then(result => {
  console.log();
  console.log('Final Result:', result.success ? '✅ SUCCESS' : '❌ FAILED');
  process.exit(result.success ? 0 : 1);
});
