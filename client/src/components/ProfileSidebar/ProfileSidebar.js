import { Link, useLocation } from 'react-router-dom';
import './ProfileSidebar.css';

function ProfileSidebar() {
  const location = useLocation();

  const menuItems = [
    { name: 'Tài khoản của tôi', path: '/profile', icon: '👤' },
    { name: 'Đơn hàng của tôi', path: '/profile/orders', icon: '📦' },
    { name: 'Voucher', path: '/profile/vouchers', icon: '🎟️' },
  ];

  return (
    <aside className="profile-sidebar">
      <ul className="profile-sidebar__list">
        {menuItems.map((item) => (
          <li key={item.path} className="profile-sidebar__item">
            <Link
              to={item.path}
              className={`profile-sidebar__link ${
                location.pathname === item.path ? 'profile-sidebar__link--active' : ''
              }`}
            >
              <span className="profile-sidebar__icon">{item.icon}</span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default ProfileSidebar;
