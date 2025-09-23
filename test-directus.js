// Test Directus connection using admin credentials
const DIRECTUS_URL = process.env.DIRECTUS_URL || 'https://your-directus-url.com';
const ADMIN_EMAIL = 'xaranex@gmail.com';
const ADMIN_PASSWORD = '4yx4w7wlaieniq4saoovl592ld1ysu28';

async function testDirectus() {
  try {
    console.log('Testing Directus connection...');
    console.log('URL:', DIRECTUS_URL);
    console.log('Admin Email:', ADMIN_EMAIL);

    // Test basic API access
    const infoResponse = await fetch(`${DIRECTUS_URL}/server/info`);
    if (infoResponse.ok) {
      const data = await infoResponse.json();
      console.log('✅ Directus server info accessible!');
      console.log('Directus version:', data.data?.version);
    } else {
      console.log('❌ Server info not accessible:', infoResponse.status, infoResponse.statusText);
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
