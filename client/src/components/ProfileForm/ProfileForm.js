import './ProfileForm.css';

function ProfileForm({
  formValues,
  formErrors,
  fieldRefs,
  onFieldChange,
  onSubmit,
  isSaving,
  saveMessage,
  saveError
}) {
  return (
    <form className="profile-form" onSubmit={onSubmit} noValidate>
      <h1 className="profile-form__title">Ho so ca nhan</h1>

      <div className="profile-form__field-group">
        <label htmlFor="profile-username">Ten dang nhap</label>
        <input
          id="profile-username"
          name="username"
          value={formValues.username}
          onChange={onFieldChange}
          ref={(el) => {
            fieldRefs.current.username = el;
          }}
          disabled={isSaving}
        />
        {formErrors.username ? (
          <p className="profile-form__error">{formErrors.username}</p>
        ) : null}
      </div>

      <div className="profile-form__field-group">
        <label htmlFor="profile-fullName">Ho va ten</label>
        <input
          id="profile-fullName"
          name="fullName"
          value={formValues.fullName}
          onChange={onFieldChange}
          ref={(el) => {
            fieldRefs.current.fullName = el;
          }}
          disabled={isSaving}
        />
        {formErrors.fullName ? (
          <p className="profile-form__error">{formErrors.fullName}</p>
        ) : null}
      </div>

      <div className="profile-form__field-group">
        <label htmlFor="profile-email">Email</label>
        <div className="profile-form__inline-row">
          <input
            id="profile-email"
            name="email"
            value={formValues.email}
            onChange={onFieldChange}
            ref={(el) => {
              fieldRefs.current.email = el;
            }}
            disabled={isSaving}
          />
          <button type="button" className="profile-form__link-button" disabled={isSaving}>
            Thay doi email
          </button>
        </div>
        {formErrors.email ? (
          <p className="profile-form__error">{formErrors.email}</p>
        ) : null}
      </div>

      <div className="profile-form__field-group">
        <label htmlFor="profile-phone">So dien thoai</label>
        <div className="profile-form__inline-row">
          <input
            id="profile-phone"
            name="phone"
            value={formValues.phone}
            onChange={onFieldChange}
            ref={(el) => {
              fieldRefs.current.phone = el;
            }}
            disabled={isSaving}
          />
          <button type="button" className="profile-form__link-button" disabled={isSaving}>
            Thay doi sdt
          </button>
        </div>
        {formErrors.phone ? (
          <p className="profile-form__error">{formErrors.phone}</p>
        ) : null}
      </div>

      <div className="profile-form__field-group profile-form__field-group--wide">
        <label htmlFor="profile-address">Dia chi</label>
        <input
          id="profile-address"
          name="address"
          value={formValues.address}
          onChange={onFieldChange}
          ref={(el) => {
            fieldRefs.current.address = el;
          }}
          disabled={isSaving}
        />
        {formErrors.address ? (
          <p className="profile-form__error">{formErrors.address}</p>
        ) : null}
      </div>

      <button type="submit" className="profile-form__submit" disabled={isSaving}>
        {isSaving ? 'Dang luu...' : 'Luu'}
      </button>

      {saveMessage ? <p className="profile-form__message">{saveMessage}</p> : null}
      {saveError ? <p className="profile-form__error">{saveError}</p> : null}
    </form>
  );
}

export default ProfileForm;
