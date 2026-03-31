import { useMemo, useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import {
  clearAuthSession,
  loadAuthSession,
  saveAuthSession,
} from './utils/authStorage';

function App() {
  const [page, setPage] = useState('login');
  const [session, setSession] = useState(() => loadAuthSession());

  const headline = useMemo(() => {
    if (!session?.user?.email) {
      return 'E-Store';
    }

    return `Hi, ${session.user.email}`;
  }, [session]);

  const handleAuthSuccess = ({ token, user }) => {
    const nextSession = { token, user };
    saveAuthSession(nextSession);
    setSession(nextSession);
  };

  const handleLogout = () => {
    clearAuthSession();
    setSession(null);
    setPage('login');
  };

  return (
    <div className="auth-scene">
      <main className="auth-content">
        <h1 className="brand-title">{headline}</h1>

        {session ? (
          <section className="auth-card-wrap" aria-label="logged in">
            <div className="auth-card user-panel">
              <h2>Success</h2>
              <p className="auth-welcome">You are authenticated.</p>
              <p className="auth-session-line">
                Email: <strong>{session.user.email}</strong>
              </p>
              <button type="button" className="auth-submit" onClick={handleLogout}>
                ĐĂNG XUẤT
              </button>
            </div>
          </section>
        ) : page === 'login' ? (
          <Login
            onSwitchToRegister={() => setPage('register')}
            onAuthSuccess={handleAuthSuccess}
          />
        ) : (
          <Register
            onSwitchToLogin={() => setPage('login')}
            onAuthSuccess={handleAuthSuccess}
          />
        )}
      </main>
    </div>
  );
}

export default App;
