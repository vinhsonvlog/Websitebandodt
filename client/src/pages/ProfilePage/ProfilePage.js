import { useEffect, useMemo, useRef, useState } from 'react';
import ProfileAvatarUploader from '../../components/ProfileAvatarUploader/ProfileAvatarUploader';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import ProfileTopNav from '../../components/ProfileTopNav/ProfileTopNav';
import { getProfile, updateProfile } from '../../services/profileService';
import './ProfilePage.css';

const EMPTY_PROFILE = {
  username: '',
  fullName: '',
  email: '',
  phone: '',
  address: '',
  avatarUrl: ''
};

function validateProfile(formValues) {
  const nextErrors = {};

  if (!formValues.username.trim()) {
    nextErrors.username = 'Vui long nhap ten dang nhap.';
  }

  if (!formValues.fullName.trim()) {
    nextErrors.fullName = 'Vui long nhap ho va ten.';
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email);
  if (!isValidEmail) {
    nextErrors.email = 'Email khong hop le.';
  }

  const isValidPhone = /^\d{9,11}$/.test(formValues.phone);
  if (!isValidPhone) {
    nextErrors.phone = 'So dien thoai phai gom 9-11 chu so.';
  }

  if (!formValues.address.trim()) {
    nextErrors.address = 'Vui long nhap dia chi.';
  }

  return nextErrors;
}

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [formValues, setFormValues] = useState(EMPTY_PROFILE);
  const [formErrors, setFormErrors] = useState({});
  const [viewStatus, setViewStatus] = useState('loading');
  const [saveStatus, setSaveStatus] = useState('idle');
  const [saveError, setSaveError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [avatarError, setAvatarError] = useState('');
  const fieldRefs = useRef({});

  const isSaving = saveStatus === 'saving';

  const loadProfile = async () => {
    setViewStatus('loading');

    try {
      const response = await getProfile();

      if (!response.success || !response.data) {
        setProfile(null);
        setViewStatus('empty');
        return;
      }

      setProfile(response.data);
      setFormValues(response.data);
      setViewStatus('success');
    } catch (error) {
      setViewStatus('error');
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const onFieldChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));

    setFormErrors((prev) => {
      if (!prev[name]) {
        return prev;
      }

      const nextErrors = { ...prev };
      delete nextErrors[name];
      return nextErrors;
    });

    if (saveMessage) {
      setSaveMessage('');
    }
  };

  const focusFirstErrorField = (errors) => {
    const orderedFields = ['username', 'fullName', 'email', 'phone', 'address'];
    const firstErrorField = orderedFields.find((fieldName) => errors[fieldName]);

    if (!firstErrorField) {
      return;
    }

    fieldRefs.current[firstErrorField]?.focus();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSaveError('');
    setSaveMessage('');

    const nextErrors = validateProfile(formValues);
    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      focusFirstErrorField(nextErrors);
      return;
    }

    setSaveStatus('saving');

    try {
      const response = await updateProfile(formValues);

      if (!response.success) {
        setSaveStatus('error');
        setSaveError('Khong the cap nhat ho so. Vui long thu lai.');
        return;
      }

      setSaveStatus('saved');
      setSaveMessage(response.message || 'Cap nhat ho so thanh cong.');
      setProfile(response.data);
    } catch (error) {
      setSaveStatus('error');
      setSaveError('Khong the cap nhat ho so. Vui long thu lai.');
    }
  };

  const onAvatarSelected = (nextAvatarUrl, nextAvatarError) => {
    setAvatarError(nextAvatarError);

    if (!nextAvatarUrl) {
      return;
    }

    setFormValues((prev) => ({
      ...prev,
      avatarUrl: nextAvatarUrl
    }));
  };

  const currentAvatarUrl = useMemo(() => {
    return (
      formValues.avatarUrl ||
      profile?.avatarUrl ||
      'https://via.placeholder.com/260x320?text=Avatar'
    );
  }, [formValues.avatarUrl, profile]);

  return (
    <div className="profile-page">
      <ProfileTopNav />

      <main className="profile-page__content">
        {viewStatus === 'loading' ? (
          <section className="profile-page__state" aria-live="polite">
            Dang tai du lieu ho so...
          </section>
        ) : null}

        {viewStatus === 'error' ? (
          <section className="profile-page__state profile-page__state--error" role="alert">
            <p>Da xay ra loi khi tai du lieu.</p>
            <button type="button" onClick={loadProfile}>
              Thu lai
            </button>
          </section>
        ) : null}

        {viewStatus === 'empty' ? (
          <section className="profile-page__state" aria-live="polite">
            <p>Khong co du lieu ho so.</p>
            <button type="button" onClick={loadProfile}>
              Tai lai
            </button>
          </section>
        ) : null}

        {viewStatus === 'success' ? (
          <section className="profile-page__layout">
            <ProfileForm
              formValues={formValues}
              formErrors={formErrors}
              fieldRefs={fieldRefs}
              onFieldChange={onFieldChange}
              onSubmit={onSubmit}
              isSaving={isSaving}
              saveMessage={saveMessage}
              saveError={saveError}
            />

            <ProfileAvatarUploader
              avatarUrl={currentAvatarUrl}
              onAvatarSelected={onAvatarSelected}
              isSaving={isSaving}
              avatarError={avatarError}
            />
          </section>
        ) : null}
      </main>
    </div>
  );
}

export default ProfilePage;
