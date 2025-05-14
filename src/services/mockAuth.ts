
// Mock authentication service that uses localStorage instead of API calls
interface MockUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  title?: string;
}

// Storage key
const USERS_STORAGE_KEY = 'careerbloom_users';

// Get all users from localStorage
export const getUsers = (): MockUser[] => {
  const usersJSON = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJSON ? JSON.parse(usersJSON) : [];
};

// Save users to localStorage
export const saveUsers = (users: MockUser[]): void => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Register a new user
export const registerUser = (name: string, email: string, password: string): MockUser => {
  const users = getUsers();
  
  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  // Create new user
  const newUser: MockUser = {
    _id: Date.now().toString(),
    name,
    email,
    password, // In a real app, you would hash this password
  };
  
  // Save to localStorage
  users.push(newUser);
  saveUsers(users);
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return newUser;
};

// Login user
export const loginUser = (email: string, password: string): MockUser => {
  const users = getUsers();
  
  // Find user
  const user = users.find(user => user.email === email);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Check password
  if (user.password !== password) {
    throw new Error('Invalid email or password');
  }
  
  // Return user without password
  return user;
};

// Update user profile
export const updateUserProfile = (
  userId: string, 
  updates: { name?: string; title?: string; skills?: string[]; experience?: string; education?: any[] }
): MockUser => {
  const users = getUsers();
  
  const userIndex = users.findIndex(user => user._id === userId);
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  // Update user
  users[userIndex] = { ...users[userIndex], ...updates };
  saveUsers(users);
  
  return users[userIndex];
};

// Get user profile
export const getUserProfile = (userId: string): MockUser => {
  const users = getUsers();
  
  const user = users.find(user => user._id === userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
};
