export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'User' | 'Viewer';
}

export interface AuthResponse {
  user: User;
  token: string;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// Generate fake JWT token (base64 encoded payload)
const generateFakeToken = (user: User): string => {
  const payload = {
    id: user.id,
    email: user.email,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };
  return btoa(JSON.stringify(payload));
};

// Valid credentials
const VALID_EMAIL = 'vn.liennguyen@gmail.com';
const VALID_PASSWORD = '1234567';

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Validate credentials
    if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
      throw new Error('Invalid email or password');
    }

    const user: User = {
      id: 'user_' + Date.now(),
      email,
      name: 'Liên Nguyễn',
      role: 'Admin',
    };

    const token = generateFakeToken(user);

    // Store in localStorage
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return { user, token };
  },

  logout: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem(USER_KEY);
    if (!userJson) return null;

    try {
      return JSON.parse(userJson) as User;
    } catch {
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY) && !!localStorage.getItem(USER_KEY);
  },
};
