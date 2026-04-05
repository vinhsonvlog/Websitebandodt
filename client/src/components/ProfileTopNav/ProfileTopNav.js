import './ProfileTopNav.css';

function ProfileTopNav() {
  return (
    <header className="profile-nav">
      <div className="profile-nav__title"></div>
      <div className="profile-nav__toolbar">
        <span className="profile-nav__logo">Logo</span>
        <button type="button" className="profile-nav__button">
          Danh muc
        </button>
        <label className="profile-nav__search" htmlFor="profile-search">
          <input
            id="profile-search"
            type="text"
            placeholder="Tim kiem san pham..."
            aria-label="Tim kiem san pham"
          />
        </label>
        <button type="button" className="profile-nav__button">
          Gio hang
        </button>
        <button
          type="button"
          className="profile-nav__avatar-button"
          aria-label="Trang ca nhan"
        >
          TK
        </button>
      </div>
    </header>
  );
}

export default ProfileTopNav;
