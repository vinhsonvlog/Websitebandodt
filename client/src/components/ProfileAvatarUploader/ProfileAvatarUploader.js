import './ProfileAvatarUploader.css';

function ProfileAvatarUploader({
  avatarUrl,
  onAvatarSelected,
  isSaving,
  avatarError
}) {
  const handleSelect = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const isAcceptedType = ['image/jpeg', 'image/png', 'image/jpg'].includes(
      selectedFile.type
    );

    if (!isAcceptedType) {
      onAvatarSelected('', 'Dinh dang file khong hop le. Dung JPG hoac PNG.');
      return;
    }

    const maxSizeInBytes = 1024 * 1024;
    if (selectedFile.size > maxSizeInBytes) {
      onAvatarSelected('', 'Dung luong anh vuot qua 1MB.');
      return;
    }

    const imageUrl = URL.createObjectURL(selectedFile);
    onAvatarSelected(imageUrl, '');
  };

  return (
    <section className="profile-avatar" aria-label="Khu vuc avatar">
      <img src={avatarUrl} alt="Anh dai dien" className="profile-avatar__image" />

      <label className="profile-avatar__upload" htmlFor="profile-avatar-input">
        Chon anh
      </label>
      <input
        id="profile-avatar-input"
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        onChange={handleSelect}
        disabled={isSaving}
      />

      <p className="profile-avatar__hint">
        Dung luong file toi da 1 MB
        <br />
        Dinh dang: JPEG, PNG
      </p>

      {avatarError ? <p className="profile-avatar__error">{avatarError}</p> : null}
    </section>
  );
}

export default ProfileAvatarUploader;
