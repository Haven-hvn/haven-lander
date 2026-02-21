#!/usr/bin/env node
/**
 * Test script for Filecoin Pay (USDFC) Subgraph API
 * GraphQL Endpoint: https://api.studio.thegraph.com/query/90347/usdfc/version/latest
 */

const FILECOIN_PAY_GRAPHQL_URL = 'https://api.studio.thegraph.com/query/90347/usdfc/version/latest';

async function executeQuery(query, variables = {}) {
  try {
    const response = await fetch(FILECOIN_PAY_GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}

async function testFilecoinPayAPI() {
  console.log('🧪 Testing Filecoin Pay (USDFC) Subgraph API');
  console.log('=' .repeat(70));
  console.log(`Endpoint: ${FILECOIN_PAY_GRAPHQL_URL}`);

  // Test 1: Introspection query to see what's available
  console.log('\n📡 Test 1: Schema Introspection');
  console.log('-'.repeat(70));
  
  const introspectionQuery = `
    {
      __schema {
        types {
          name
          kind
          fields {
            name
            type {
              name
              kind
            }
          }
        }
      }
    }
  `;
  
  const introResult = await executeQuery(introspectionQuery);
  if (introResult.error) {
    console.log(`   ❌ Introspection failed: ${introResult.error}`);
  } else if (introResult.errors) {
    console.log(`   ⚠️ Introspection not allowed (expected for public subgraphs)`);
  } else {
    console.log(`   ✅ Schema available`);
    const types = introResult.data?.__schema?.types || [];
    console.log(`   Types found: ${types.length}`);
    
    // Look for entity types
    const entities = types.filter(t => 
      t.fields && t.fields.length > 0 && 
      !t.name.startsWith('__')
    );
    console.log(`\n   Available entities:`);
    entities.slice(0, 10).forEach(t => {
      console.log(`     - ${t.name}`);
    });
  }

  // Test 2: Metadata
  console.log('\n📡 Test 2: Subgraph Metadata');
  console.log('-'.repeat(70));
  
  const metaQuery = `
    {
      _meta {
        block {
          number
          timestamp
        }
        deployment
        hasIndexingErrors
      }
    }
  `;
  
  const metaResult = await executeQuery(metaQuery);
  if (metaResult.error) {
    console.log(`   ❌ Error: ${metaResult.error}`);
  } else if (metaResult.errors) {
    console.log(`   ⚠️ No metadata available`);
    console.log(`   Error: ${JSON.stringify(metaResult.errors)}`);
  } else {
    console.log(`   ✅ Metadata available`);
    console.log(`   Block: ${metaResult.data?._meta?.block?.number}`);
    console.log(`   Timestamp: ${metaResult.data?._meta?.block?.timestamp}`);
    console.log(`   Has Errors: ${metaResult.data?._meta?.hasIndexingErrors}`);
  }

  // Test 3: Common entity queries
  console.log('\n📡 Test 3: Common Entities');
  console.log('-'.repeat(70));

  const entityQueries = [
    ['Tokens', `{ tokens(first: 5) { id symbol name totalSupply } }`],
    ['Payments', `{ payments(first: 5) { id amount token timestamp status } }`],
    ['Users', `{ users(first: 5) { id address balance } }`],
    ['Transactions', `{ transactions(first: 5) { id hash from to value } }`],
    ['Transfers', `{ transfers(first: 5) { id from to value timestamp } }`],
  ];

  for (const [name, query] of entityQueries) {
    console.log(`\n   Testing: ${name}`);
    const result = await executeQuery(query);
    
    if (result.error) {
      console.log(`      ❌ Network error: ${result.error}`);
    } else if (result.errors) {
      const errorMsg = result.errors[0]?.message || 'Unknown error';
      if (errorMsg.includes('Type') && errorMsg.includes('does not exist')) {
        console.log(`      ⚠️ Entity not found in schema`);
      } else {
        console.log(`      ⚠️ Query error: ${errorMsg.substring(0, 80)}`);
      }
    } else {
      const data = result.data;
      const key = Object.keys(data)[0];
      const items = data[key];
      console.log(`      ✅ Found ${items?.length || 0} items`);
      if (items && items.length > 0) {
        console.log(`      Sample: ${JSON.stringify(items[0]).substring(0, 100)}...`);
      }
    }
  }

  // Test 4: Specific USDFC queries
  console.log('\n📡 Test 4: USDFC-Specific Queries');
  console.log('-'.repeat(70));

  const usdfcQueries = [
    ['Token Stats', `
      {
        token(id: "usdfc") {
          id
          symbol
          totalSupply
          totalVolume
        }
      }
    `],
    ['All Token Stats', `
      {
        tokens(first: 10) {
          id
          symbol
          name
          totalSupply
          totalVolume
          totalTransactions
        }
      }
    `],
  ];

  for (const [name, query] of usdfcQueries) {
    console.log(`\n   Testing: ${name}`);
    const result = await executeQuery(query);
    
    if (result.error) {
      console.log(`      ❌ Network error: ${result.error}`);
    } else if (result.errors) {
      console.log(`      ⚠️ Query error: ${result.errors[0]?.message?.substring(0, 80)}`);
    } else {
      console.log(`      ✅ Success`);
      console.log(`      Data: ${JSON.stringify(result.data).substring(0, 200)}`);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('📊 SUMMARY');
  console.log('='.repeat(70));
  console.log('\nSubgraph Status:');
  
  if (metaResult.data?._meta) {
    console.log('  ✅ Subgraph is deployed and responding');
    console.log(`  📦 Block: ${metaResult.data._meta.block.number}`);
    if (metaResult.data._meta.hasIndexingErrors) {
      console.log('  ⚠️  Subgraph has indexing errors');
    }
  } else {
    console.log('  ⚠️  Subgraph may not be fully deployed or requires authentication');
  }

  console.log('\nRecommendation:');
  console.log('  - If entities return empty arrays, the subgraph is indexing');
  console.log('  - If queries fail with "does not exist", schema is different');
  console.log('  - Use mock data for development until subgraph is ready');

  return { success: true };
}

testFilecoinPayAPI().then(result => {
  console.log('\n' + '='.repeat(70));
  console.log('Final Result:', result.success ? '✅ COMPLETED' : '❌ FAILED');
  process.exit(0);
});
