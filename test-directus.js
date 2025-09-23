// Test Directus connection using admin credentials
const DIRECTUS_URL = process.env.DIRECTUS_URL || 'https://directus-production-08d0.up.railway.app';
const ADMIN_EMAIL = 'xaranex@gmail.com';
const ADMIN_PASSWORD = '4yx4w7wlaieniq4saoovl592ld1ysu28';
const API_KEY = process.env.DIRECTUS_API_KEY || 'qIp9z5ciY-QJBMDvpdBFczidkY7TDTTZ';

// Test with API key (like the server does)
async function testWithAPIKey() {
  console.log('\n=== Testing with API Key ===');

  const response = await fetch(`${DIRECTUS_URL}/items/products?fields=*,image.id,image.filename_download,image.type,image.width,image.height`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const data = await response.json();
    console.log('✅ Products with images accessible!');
    console.log('Response:', JSON.stringify(data, null, 2));
  } else {
    console.log('❌ Products not accessible:', response.status, response.statusText);
    const error = await response.text();
    console.log('Error details:', error);
  }
}

async function testDirectus() {
  try {
    console.log('Testing Directus connection...');
    console.log('URL:', DIRECTUS_URL);
    console.log('Admin Email:', ADMIN_EMAIL);

    // Test basic API access
    console.log('\n=== Testing Server Info ===');
    const infoResponse = await fetch(`${DIRECTUS_URL}/server/info`);
    if (infoResponse.ok) {
      const data = await infoResponse.json();
      console.log('✅ Directus server info accessible!');
      console.log('Directus version:', data.data?.version);
    } else {
      console.log('❌ Server info not accessible:', infoResponse.status, infoResponse.statusText);
      const errorText = await infoResponse.text();
      console.log('Error details:', errorText);
    }

    // Test available endpoints
    console.log('\n=== Testing Available Endpoints ===');
    const endpoints = ['/server/specs/oas', '/auth', '/collections', '/fields'];
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${DIRECTUS_URL}${endpoint}`);
        console.log(`${endpoint}: ${response.status} ${response.statusText}`);
      } catch (error) {
        console.log(`${endpoint}: Error - ${error.message}`);
      }
    }

    // Test admin login
    console.log('\nTesting admin login...');
    const loginResponse = await fetch(`${DIRECTUS_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      })
    });

    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('✅ Admin login successful!');
      const adminToken = loginData.data.access_token;
      console.log('Admin token received');

      // Test user creation with admin token
      console.log('\nTesting user creation...');
      const userResponse = await fetch(`${DIRECTUS_URL}/users`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: `test-${Date.now()}@example.com`,
          password: 'testpassword123',
          first_name: 'Test',
          last_name: 'User',
          status: 'active'
        })
      });

      if (userResponse.ok) {
        console.log('✅ User creation works!');
        const userData = await userResponse.json();
        console.log('Created user ID:', userData.data?.id);
      } else {
        console.log('❌ User creation failed:', userResponse.status, userResponse.statusText);
        const error = await userResponse.text();
        console.log('Error details:', error);
      }

      // Test getting current user
      console.log('\nTesting user profile access...');
      const profileResponse = await fetch(`${DIRECTUS_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (profileResponse.ok) {
        console.log('✅ User profile access works!');
      } else {
        console.log('❌ User profile access failed:', profileResponse.status, profileResponse.statusText);
      }

    } else {
      console.log('❌ Admin login failed:', loginResponse.status, loginResponse.statusText);
      const error = await loginResponse.text();
      console.log('Error details:', error);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testDirectus();
testWithAPIKey();
