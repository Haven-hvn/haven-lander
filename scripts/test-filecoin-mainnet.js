#!/usr/bin/env node
/**
 * Test script for Filecoin Pay Mainnet
 * Uses the real Goldsky subgraph endpoint
 */

const SUBGRAPH_URL = 'https://api.goldsky.com/api/public/project_cmb9tuo8r1xdw01ykb8uidk7h/subgraphs/filecoin-pay-mainnet/1.0.6/gn';

// Token addresses
const USDFC_ADDRESS = '0x80B98d3aa09ffff255c3ba4A241111Ff1262F045';
const FIL_ADDRESS = '0x0000000000000000000000000000000000000000';

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

function formatToken(value, decimals = 18) {
  if (!value) return '0';
  try {
    const bigValue = BigInt(value);
    const divisor = BigInt(10 ** decimals);
    const integerPart = bigValue / divisor;
    const decimalPart = bigValue % divisor;
    const decimalStr = decimalPart.toString().padStart(decimals, '0');
    const trimmedDecimal = decimalStr.slice(0, 4).replace(/0+$/, '');
    return trimmedDecimal 
      ? `${integerPart.toLocaleString()}.${trimmedDecimal}`
      : integerPart.toLocaleString();
  } catch (e) {
    return value;
  }
}

async function testFilecoinPay() {
  console.log('🧪 Testing Filecoin Pay Mainnet');
  console.log('=' .repeat(70));
  console.log(`Endpoint: ${SUBGRAPH_URL}`);
  console.log(`USDFC: ${USDFC_ADDRESS}`);
  console.log(`FIL: ${FIL_ADDRESS}`);
  console.log();

  try {
    const startTime = performance.now();
    const response = await fetch(SUBGRAPH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_STATS_DASHBOARD,
        variables: {
          usdfcAddress: USDFC_ADDRESS,
          filAddress: FIL_ADDRESS,
        },
      }),
    });
    const responseTime = Math.round(performance.now() - startTime);

    console.log(`Response Status: ${response.status} ${response.statusText}`);
    console.log(`Response Time: ${responseTime}ms`);
    console.log();

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL Errors:', JSON.stringify(data.errors, null, 2));
      throw new Error('GraphQL query returned errors');
    }

    console.log('✅ Subgraph responded successfully');
    console.log();

    const { usdfcToken, filToken } = data.data || {};

    // Display USDFC data
    if (usdfcToken) {
      console.log('📊 USDFC Token:');
      console.log('-'.repeat(40));
      
      const totalSettled = BigInt(usdfcToken.totalSettledAmount || '0');
      const totalOneTime = BigInt(usdfcToken.totalOneTimePayment || '0');
      const totalTransacted = totalSettled + totalOneTime;
      
      console.log(`  Total Settled:     ${formatToken(usdfcToken.totalSettledAmount)} USDFC`);
      console.log(`  One-Time Payments: ${formatToken(usdfcToken.totalOneTimePayment)} USDFC`);
      console.log(`  TOTAL TRANSACTED:  ${formatToken(totalTransacted.toString())} USDFC`);
      console.log();
      console.log(`  User Funds:        ${formatToken(usdfcToken.userFunds)} USDFC`);
      console.log(`  Lockup Current:    ${formatToken(usdfcToken.lockupCurrent)} USDFC`);
      console.log(`  Lockup Rate:       ${formatToken(usdfcToken.lockupRate)} USDFC/epoch`);
      console.log(`  Last Settled Epoch: ${usdfcToken.lockupLastSettledUntilEpoch}`);
      console.log();
    } else {
      console.log('⚠️  USDFC token not found in subgraph');
    }

    // Display FIL data
    if (filToken) {
      console.log('📊 FIL Token:');
      console.log('-'.repeat(40));
      
      const totalSettled = BigInt(filToken.totalSettledAmount || '0');
      const totalOneTime = BigInt(filToken.totalOneTimePayment || '0');
      const totalTransacted = totalSettled + totalOneTime;
      
      console.log(`  Total Settled:     ${formatToken(filToken.totalSettledAmount)} FIL`);
      console.log(`  One-Time Payments: ${formatToken(filToken.totalOneTimePayment)} FIL`);
      console.log(`  TOTAL TRANSACTED:  ${formatToken(totalTransacted.toString())} FIL`);
      console.log();
      console.log(`  User Funds:        ${formatToken(filToken.userFunds)} FIL`);
      console.log(`  Lockup Current:    ${formatToken(filToken.lockupCurrent)} FIL`);
      console.log();
    } else {
      console.log('ℹ️  FIL token returns null (expected for native FIL)');
    }

    // Raw response
    console.log('📄 Raw Response:');
    console.log('-'.repeat(40));
    console.log(JSON.stringify(data.data, null, 2).substring(0, 1000));

    return { success: true, data: data.data };

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return { success: false, error: error.message };
  }
}

testFilecoinPay().then(result => {
  console.log('\n' + '='.repeat(70));
  console.log('Final Result:', result.success ? '✅ SUCCESS' : '❌ FAILED');
  process.exit(result.success ? 0 : 1);
});
