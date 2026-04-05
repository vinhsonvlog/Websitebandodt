const AUTH_TOKEN_KEY = 'estore_auth_token';
const AUTH_USER_KEY = 'estore_auth_user';

function saveAuthSession({ token, user }) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

function loadAuthSession() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const rawUser = localStorage.getItem(AUTH_USER_KEY);

  if (!token || !rawUser) {
    return null;
  }

  try {
    const user = JSON.parse(rawUser);
    return { token, user };
  } catch (error) {
    clearAuthSession();
    return null;
  }
}

function clearAuthSession() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

export { saveAuthSession, loadAuthSession, clearAuthSession };
