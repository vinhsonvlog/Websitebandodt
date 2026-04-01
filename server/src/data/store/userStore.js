const fs = require('fs/promises');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', '..', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

async function ensureUsersFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(USERS_FILE);
  } catch (error) {
    await fs.writeFile(USERS_FILE, '[]', 'utf8');
  }
}

async function readUsers() {
  await ensureUsersFile();
  const content = await fs.readFile(USERS_FILE, 'utf8');

  try {
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

async function writeUsers(users) {
  await ensureUsersFile();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

async function findUserByEmail(email) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const users = await readUsers();
  return users.find((user) => user.email === normalizedEmail) || null;
}

async function createUser(user) {
  const users = await readUsers();
  users.push(user);
  await writeUsers(users);
  return user;
}

async function updateUserByEmail(email, updates) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const users = await readUsers();
  const index = users.findIndex((user) => user.email === normalizedEmail);

  if (index === -1) {
    return null;
  }

  users[index] = {
    ...users[index],
    ...updates,
  };

  await writeUsers(users);
  return users[index];
}

module.exports = {
  findUserByEmail,
  createUser,
  updateUserByEmail,
};
