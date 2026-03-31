const MOCK_PROFILE = {
  username: '',
  fullName: '',
  email: '',
  phone: '',
  address: '',
  avatarUrl:
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80'
};

const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export async function getProfile() {
  await delay(700);
  return {
    success: true,
    data: MOCK_PROFILE
  };
}

export async function updateProfile(profilePayload) {
  await delay(900);

  return {
    success: true,
    data: profilePayload,
    message: 'Cap nhat ho so thanh cong.'
  };
}
