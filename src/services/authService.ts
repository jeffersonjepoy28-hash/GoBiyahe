import { User } from '../types';

interface StoredCredential {
  id: string;
  name: string;
  email: string;
  phone: string;
  salt: string;
  passwordHash: string;
  walletBalance: number;
  savedAddresses: Array<{
    id: string;
    label: string;
    address: string;
    isDefault?: boolean;
  }>;
  createdAt: string;
}

const STORAGE_USERS_KEY = 'pandago_users_v1';
const STORAGE_CURRENT_USER_KEY = 'pandago_current_user_v1';

// Cryptographic hash using Web Crypto API (SHA-256 with salt)
async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(password + salt);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateSalt(): string {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

function getStoredUsers(): StoredCredential[] {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredCredential[]) {
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
}

// Initialize demo user if empty
export async function initializeAuthStore() {
  const users = getStoredUsers();
  if (users.length === 0) {
    const demoSalt = 'pandago_demo_salt_99';
    const demoHash = await hashPassword('password123', demoSalt);
    const demoUser: StoredCredential = {
      id: 'usr-demo-1',
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      phone: '+63 917 555 0192',
      salt: demoSalt,
      passwordHash: demoHash,
      walletBalance: 250.00,
      savedAddresses: [
        { id: 'addr-1', label: 'Home', address: 'Blk 12 Lot 4, Lakewood City, Brgy. Sumacab, Cabanatuan City, Nueva Ecija', isDefault: true },
        { id: 'addr-2', label: 'Work', address: 'Near SM City Cabanatuan, Maharlika Highway, Cabanatuan City', isDefault: false },
        { id: 'addr-3', label: 'University', address: 'Wesleyan University, Mabini Extension, Cabanatuan City', isDefault: false },
      ],
      createdAt: new Date().toISOString(),
    };
    saveStoredUsers([demoUser]);
    // Set as initial logged-in user for effortless first-run testing
    const currentUser = getCurrentUser();
    if (!currentUser) {
      setCurrentUserSession({
        id: demoUser.id,
        name: demoUser.name,
        email: demoUser.email,
        phone: demoUser.phone,
        isVerified: true,
        verifiedPhone: true,
        verifiedId: true,
        walletBalance: demoUser.walletBalance,
        savedAddresses: demoUser.savedAddresses,
        linkedAccounts: [
          {
            id: 'lnk-gcash-1',
            type: 'gcash',
            providerName: 'GCash',
            accountNumberMasked: '0917-***-0192',
            accountHolderName: 'Sarah Chen',
            isDefault: true,
            linkedAt: 'Verified Today',
          },
          {
            id: 'lnk-bank-1',
            type: 'bank',
            providerName: 'BDO Unibank',
            accountNumberMasked: '****-****-4821',
            accountHolderName: 'Sarah Chen',
            isDefault: false,
            linkedAt: 'Verified Yesterday',
          },
        ],
        createdAt: demoUser.createdAt,
      });
    }
  }
}

export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentUserSession(user: User | null) {
  if (user) {
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
  }
}

export async function registerUser(name: string, email: string, password: string, phone: string = ''): Promise<User> {
  const trimmedEmail = email.trim().toLowerCase();
  if (!name.trim()) throw new Error('Please enter your full name.');
  if (!trimmedEmail || !trimmedEmail.includes('@')) throw new Error('Please provide a valid email address.');
  if (password.length < 6) throw new Error('Password must be at least 6 characters long.');

  const users = getStoredUsers();
  const existing = users.find(u => u.email.toLowerCase() === trimmedEmail);
  if (existing) {
    throw new Error('An account with this email already exists. Please log in.');
  }

  const salt = generateSalt();
  const passwordHash = await hashPassword(password, salt);

  const newUser: StoredCredential = {
    id: `usr-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: name.trim(),
    email: trimmedEmail,
    phone: phone.trim() || '+63 900 000 0000',
    salt,
    passwordHash,
    walletBalance: 25.00, // Welcome signup bonus credit!
    savedAddresses: [
      { id: 'addr-def', label: 'Home', address: 'Salcedo Village, Makati City', isDefault: true }
    ],
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveStoredUsers(users);

  const userPublic: User = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
    isVerified: true,
    verifiedPhone: true,
    verifiedId: true,
    walletBalance: newUser.walletBalance,
    savedAddresses: newUser.savedAddresses,
    createdAt: newUser.createdAt,
  };

  setCurrentUserSession(userPublic);
  return userPublic;
}

export async function loginUser(email: string, password: string): Promise<User> {
  const trimmedEmail = email.trim().toLowerCase();
  const users = getStoredUsers();
  const found = users.find(u => u.email.toLowerCase() === trimmedEmail);

  if (!found) {
    throw new Error('No account found with this email. Please sign up first.');
  }

  const computedHash = await hashPassword(password, found.salt);
  if (computedHash !== found.passwordHash) {
    throw new Error('Incorrect password. Please try again.');
  }

  const userPublic: User = {
    id: found.id,
    name: found.name,
    email: found.email,
    phone: found.phone,
    walletBalance: found.walletBalance,
    savedAddresses: found.savedAddresses,
    createdAt: found.createdAt,
  };

  setCurrentUserSession(userPublic);
  return userPublic;
}

export function logoutUser(): void {
  setCurrentUserSession(null);
}

export function updateUserWallet(userId: string, delta: number): User | null {
  const users = getStoredUsers();
  const idx = users.findIndex(u => u.id === userId);
  if (idx !== -1) {
    users[idx].walletBalance = Math.max(0, users[idx].walletBalance + delta);
    saveStoredUsers(users);
    const updatedUser: User = {
      id: users[idx].id,
      name: users[idx].name,
      email: users[idx].email,
      phone: users[idx].phone,
      walletBalance: users[idx].walletBalance,
      savedAddresses: users[idx].savedAddresses,
      createdAt: users[idx].createdAt,
    };
    const current = getCurrentUser();
    if (current && current.id === userId) {
      setCurrentUserSession(updatedUser);
    }
    return updatedUser;
  }
  return null;
}

export function addLinkedAccount(
  userId: string,
  account: { type: 'gcash' | 'bank' | 'maya'; providerName: string; accountNumber: string; holderName: string }
): User | null {
  const current = getCurrentUser();
  if (!current || current.id !== userId) return null;

  const masked =
    account.type === 'gcash'
      ? `${account.accountNumber.slice(0, 4)}-***-${account.accountNumber.slice(-4)}`
      : `****-****-${account.accountNumber.slice(-4)}`;

  const newLnk = {
    id: `lnk-${Date.now()}`,
    type: account.type,
    providerName: account.providerName,
    accountNumberMasked: masked,
    accountHolderName: account.holderName,
    isDefault: (current.linkedAccounts?.length || 0) === 0,
    linkedAt: 'Verified Just Now',
  };

  const updated: User = {
    ...current,
    linkedAccounts: [...(current.linkedAccounts || []), newLnk],
  };

  setCurrentUserSession(updated);
  return updated;
}

export function removeLinkedAccount(userId: string, accountId: string): User | null {
  const current = getCurrentUser();
  if (!current || current.id !== userId) return null;

  const updated: User = {
    ...current,
    linkedAccounts: (current.linkedAccounts || []).filter(a => a.id !== accountId),
  };

  setCurrentUserSession(updated);
  return updated;
}

