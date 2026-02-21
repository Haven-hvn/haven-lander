#!/usr/bin/env node
/**
 * Test script for Filecoin Pay Calibration Network
 * Tries multiple potential subgraph endpoints
 */

// Potential subgraph URLs to try
const SUBGRAPH_URLS = [
  // Goldsky (most common for Filecoin)
  'https://api.goldsky.com/api/public/project_clxu1tvg9q5ia01wrgd0m6vhn/subgraphs/filecoin-pay-calibration/version/latest/gn',
  'https://api.goldsky.com/api/public/project_clxu1tvg9q5ia01wrgd0m6vhn/subgraphs/filecoin-pay-calibration/gn',
  // The Graph Studio
  'https://api.studio.thegraph.com/query/90347/filecoin-pay-calibration/version/latest',
  'https://api.studio.thegraph.com/query/90347/filecoin-pay-calibration/latest',
  // Try the USDFC endpoint we found earlier
  'https://api.studio.thegraph.com/query/90347/usdfc/version/latest',
];

// USDFC and FIL token addresses on calibration (from synapse-sdk or needs to be discovered)
// These are placeholder addresses - we need to find the actual ones
const USDFC_CALIBRATION = '0x0000000000000000000000000000000000000000'; // Placeholder
const FIL_CALIBRATION = '0x0000000000000000000000000000000000000000';   // Placeholder (native FIL)

// GraphQL query for stats dashboard
const GET_STATS_DASHBOARD = `
  query GetStatsDashboard($usdfcAddress: Bytes!, $filAddress: Bytes!) {
    usdfcToken: token(id: $usdfcAddress) {
      id
      decimals
      totalSettledAmount
      totalOneTimePayment
      userFunds
      lockupCurrent
      lockupRate
      lockupLastSettledUntilEpoch
      symbol
      name
    }
    filToken: token(id: $filAddress) {
      id
      decimals
      totalSettledAmount
      totalOneTimePayment
      userFunds
      lockupCurrent
      lockupRate
      lockupLastSettledUntilEpoch
      symbol
      name
    }
  }
`;

// Simpler query to check if subgraph is alive
const INTROSPECTION_QUERY = `
  {
    __schema {
      queryType {
        name
        fields {
          name
        }
      }
    }
  }
`;

// Query to get all tokens (to find USDFC address)
const GET_ALL_TOKENS = `
  {
    tokens(first: 10) {
      id
      symbol
      name
      decimals
    }
  }
`;

async function testEndpoint(url) {
  console.log(`\n📡 Testing: ${url}`);
  console.log('-'.repeat(70));
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: INTROSPECTION_QUERY }),
    });

    console.log(`  Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      return { success: false, status: response.status, error: 'HTTP error' };
    }

    const data = await response.json();
    
    if (data.errors) {
      console.log(`  GraphQL Errors:`, JSON.stringify(data.errors, null, 2).substring(0, 200));
      return { success: false, errors: data.errors };
    }

    console.log(`  ✅ Subgraph is responsive`);
    const fields = data.data?.__schema?.queryType?.fields || [];
    console.log(`  Available queries: ${fields.slice(0, 10).map(f => f.name).join(', ')}${fields.length > 10 ? '...' : ''}`);
    
    return { success: true, data, fields: fields.map(f => f.name) };

  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function findTokens(url) {
  console.log(`\n🔍 Searching for tokens...`);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: GET_ALL_TOKENS }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (data.errors || !data.data?.tokens) return null;

    console.log(`  Found ${data.data.tokens.length} tokens:`);
    data.data.tokens.forEach(token => {
      console.log(`    - ${token.name} (${token.symbol}): ${token.id}`);
    });

    return data.data.tokens;

  } catch (error) {
    return null;
  }
}

async function fetchStats(url, usdfcAddress, filAddress) {
  console.log(`\n📊 Fetching stats with:`);
  console.log(`  USDFC: ${usdfcAddress}`);
  console.log(`  FIL: ${filAddress}`);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: GET_STATS_DASHBOARD,
        variables: { usdfcAddress, filAddress }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.log(`  GraphQL Errors:`, JSON.stringify(data.errors, null, 2).substring(0, 300));
      return null;
    }

    return data.data;

  } catch (error) {
    console.log(`  Error: ${error.message}`);
    return null;
  }
}

function formatTokenValue(value, decimals = 18) {
  if (!value) return '0';
  try {
    const bigValue = BigInt(value);
    const divisor = BigInt(10 ** decimals);
    const integerPart = bigValue / divisor;
    const decimalPart = bigValue % divisor;
    const decimalStr = decimalPart.toString().padStart(decimals, '0');
    const trimmedDecimal = decimalStr.slice(0, 6).replace(/0+$/, '');
    return trimmedDecimal 
      ? `${integerPart.toLocaleString()}.${trimmedDecimal}`
      : integerPart.toLocaleString();
  } catch (e) {
    return value;
  }
}

async function main() {
  console.log('🧪 Testing Filecoin Pay Calibration Subgraph');
  console.log('=' .repeat(70));

  let workingUrl = null;
  let availableFields = [];

  // Test all endpoints
  for (const url of SUBGRAPH_URLS) {
    const result = await testEndpoint(url);
    if (result.success) {
      workingUrl = url;
      availableFields = result.fields;
      break;
    }
  }

  if (!workingUrl) {
    console.log('\n❌ No working subgraph endpoint found');
    console.log('\nPossible reasons:');
    console.log('  - Subgraph is not publicly accessible');
    console.log('  - URL format has changed');
    console.log('  - Network connectivity issues');
    process.exit(1);
  }

  console.log('\n' + '='.repeat(70));
  console.log('✅ Working endpoint found:', workingUrl);
  console.log('='.repeat(70));

  // Check if 'tokens' query is available
  if (availableFields.includes('tokens')) {
    const tokens = await findTokens(workingUrl);
    
    if (tokens && tokens.length > 0) {
      // Find USDFC and FIL tokens
      const usdfc = tokens.find(t => t.symbol === 'USDFC' || t.name.toLowerCase().includes('usdfc'));
      const fil = tokens.find(t => t.symbol === 'tFIL' || t.symbol === 'FIL' || t.name.toLowerCase().includes('filecoin'));
      
      if (usdfc && fil) {
        console.log(`\n✅ Found token addresses:`);
        console.log(`  USDFC: ${usdfc.id}`);
        console.log(`  FIL: ${fil.id}`);
        
        // Fetch stats
        const stats = await fetchStats(workingUrl, usdfc.id, fil.id);
        
        if (stats) {
          console.log('\n📈 Stats Results:');
          console.log('-'.repeat(70));
          
          if (stats.usdfcToken) {
            const totalTransacted = BigInt(stats.usdfcToken.totalSettledAmount || '0') + 
                                   BigInt(stats.usdfcToken.totalOneTimePayment || '0');
            console.log('\n  USDFC:');
            console.log(`    Total Transacted: ${formatTokenValue(totalTransacted.toString())} USDFC`);
            console.log(`    Total Settled: ${formatTokenValue(stats.usdfcToken.totalSettledAmount)} USDFC`);
            console.log(`    One-Time Payments: ${formatTokenValue(stats.usdfcToken.totalOneTimePayment)} USDFC`);
            console.log(`    User Funds: ${formatTokenValue(stats.usdfcToken.userFunds)} USDFC`);
            console.log(`    Lockup Current: ${formatTokenValue(stats.usdfcToken.lockupCurrent)} USDFC`);
          } else {
            console.log('\n  USDFC: No data (token not found or no activity)');
          }
          
          if (stats.filToken) {
            const totalTransacted = BigInt(stats.filToken.totalSettledAmount || '0') + 
                                   BigInt(stats.filToken.totalOneTimePayment || '0');
            console.log('\n  FIL:');
            console.log(`    Total Transacted: ${formatTokenValue(totalTransacted.toString())} FIL`);
            console.log(`    Total Settled: ${formatTokenValue(stats.filToken.totalSettledAmount)} FIL`);
            console.log(`    One-Time Payments: ${formatTokenValue(stats.filToken.totalOneTimePayment)} FIL`);
            console.log(`    User Funds: ${formatTokenValue(stats.filToken.userFunds)} FIL`);
            console.log(`    Lockup Current: ${formatTokenValue(stats.filToken.lockupCurrent)} FIL`);
          } else {
            console.log('\n  FIL: No data (token not found or no activity)');
          }
        }
      } else {
        console.log('\n⚠️ Could not find USDFC or FIL tokens in the list');
      }
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('Test completed');
}

main().catch(console.error);
