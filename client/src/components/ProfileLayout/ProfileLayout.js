import { Outlet } from 'react-router-dom';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import './ProfileLayout.css';

function ProfileLayout() {
  return (
    <div className="profile-layout">
      <ProfileSidebar />
      <div className="profile-layout__content">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileLayout;
