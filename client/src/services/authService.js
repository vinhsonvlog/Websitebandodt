const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:1124';

async function request(path, payload) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let data = null;
  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok || !data?.success) {
    const error = new Error(data?.message || 'Request failed');
    error.code = data?.code;
    throw error;
  }

  return data;
}

function login(payload) {
  return request('/api/auth/login', payload);
}

function register(payload) {
  return request('/api/auth/register', payload);
}

export { login, register };
