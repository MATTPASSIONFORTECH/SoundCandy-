import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  createdAt: string;
}

interface StoredUser {
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
  id: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (email: string, password: string, name: string) => { success: boolean; error?: string };
  logout: () => void;
  showAuth: boolean;
  setShowAuth: (v: boolean) => void;
  authMode: 'login' | 'signup';
  setAuthMode: (v: 'login' | 'signup') => void;
  getAllUsers: () => StoredUser[];
  deleteUser: (id: string) => void;
  updateUser: (id: string, data: Partial<StoredUser>) => void;
}

const ADMIN_EMAIL = 'matthewcalabresecareers@gmail.com';
const ADMIN_PASSWORD = 'Wehttam06$$';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    const saved = localStorage.getItem('soundcandy_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  const getUsers = (): StoredUser[] => {
    try {
      return JSON.parse(localStorage.getItem('soundcandy_users') || '[]');
    } catch { return []; }
  };

  const saveUsers = (users: StoredUser[]) => {
    localStorage.setItem('soundcandy_users', JSON.stringify(users));
  };

  const getAllUsers = (): StoredUser[] => getUsers();

  const deleteUser = (id: string) => {
    const users = getUsers().filter(u => u.id !== id);
    saveUsers(users);
  };

  const updateUser = (id: string, data: Partial<StoredUser>) => {
    const users = getUsers().map(u => u.id === id ? { ...u, ...data } : u);
    saveUsers(users);
  };

  const login = (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser: User = { id: 'admin-1', email: ADMIN_EMAIL, name: 'Matthew Calabrese', isAdmin: true, createdAt: new Date().toISOString() };
      setUser(adminUser);
      localStorage.setItem('soundcandy_user', JSON.stringify(adminUser));
      setShowAuth(false);
      return { success: true };
    }
    const users = getUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      const u: User = { id: found.id, email: found.email, name: found.name, isAdmin: false, createdAt: found.createdAt };
      setUser(u);
      localStorage.setItem('soundcandy_user', JSON.stringify(u));
      setShowAuth(false);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = (email: string, password: string, name: string) => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return { success: false, error: 'Please enter a valid email address' };
    }
    if (password.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters' };
    }
    const users = getUsers();
    if (users.find(u => u.email === email) || email === ADMIN_EMAIL) {
      return { success: false, error: 'An account with this email already exists' };
    }
    const newUser = { id: `user-${Date.now()}`, email, password, name, isAdmin: false, createdAt: new Date().toISOString() };
    users.push(newUser);
    saveUsers(users);
    const u: User = { id: newUser.id, email, name, isAdmin: false, createdAt: newUser.createdAt };
    setUser(u);
    localStorage.setItem('soundcandy_user', JSON.stringify(u));
    setShowAuth(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('soundcandy_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, showAuth, setShowAuth, authMode, setAuthMode, getAllUsers, deleteUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
