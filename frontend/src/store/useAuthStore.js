import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Auth Store - Manages user authentication state
 * Persists to localStorage for session recovery
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      /**
       * Sign up a new user
       */
      signup: async (email, password, name, regNumber) => {
        set({ loading: true, error: null });
        try {
          // Simulate API call - in production, this would call a real backend
          await new Promise(resolve => setTimeout(resolve, 500));

          // Validate inputs
          if (!email || !password || !name || !regNumber) {
            throw new Error('All fields are required');
          }

          if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
          }

          if (!email.includes('@')) {
            throw new Error('Please enter a valid email');
          }

          // Check if user already exists (in real app, check with backend)
          const existingUsers = localStorage.getItem('campus-sync-users');
          const users = existingUsers ? JSON.parse(existingUsers) : [];
          
          if (users.some(u => u.email === email)) {
            throw new Error('Email already registered');
          }

          // Create new user with profile initialization
          const newUser = {
            id: Date.now().toString(),
            email,
            password, // In production: hash this!
            name,
            regNumber,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            createdAt: new Date().toISOString(),
          };

          // Initialize profile data for new user - EMPTY for user to fill in
          const profileData = {
            userId: newUser.id,
            name,
            regNumber,
            avatar: newUser.avatar,
            faculty: '',
            degree: '',
            year: 1,
            semester: 1,
            gpa: 0,
            completedCredits: 0,
            totalCredits: 120,
            notificationsEnabled: false,
            theme: 'light',
            createdAt: new Date().toISOString(),
          };

          // Save user to localStorage
          users.push(newUser);
          localStorage.setItem('campus-sync-users', JSON.stringify(users));

          // Save user profile to localStorage as well
          const userProfiles = JSON.parse(localStorage.getItem('campus-sync-user-profiles') || '{}');
          userProfiles[newUser.id] = profileData;
          localStorage.setItem('campus-sync-user-profiles', JSON.stringify(userProfiles));

          // Log in the user
          const { password: _, ...userWithoutPassword } = newUser;
          set({
            user: userWithoutPassword,
            isAuthenticated: true,
            loading: false,
            error: null,
          });

          return true;
        } catch (err) {
          set({
            loading: false,
            error: err.message || 'Signup failed',
          });
          return false;
        }
      },

      /**
       * Sign in an existing user
       */
      signin: async (email, password) => {
        set({ loading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));

          if (!email || !password) {
            throw new Error('Email and password are required');
          }

          // Check credentials (in real app, verify with backend)
          const existingUsers = localStorage.getItem('campus-sync-users');
          const users = existingUsers ? JSON.parse(existingUsers) : [];

          const user = users.find(u => u.email === email && u.password === password);

          if (!user) {
            throw new Error('Invalid email or password');
          }

          // Remove password from stored user
          const { password: _, ...userWithoutPassword } = user;
          set({
            user: userWithoutPassword,
            isAuthenticated: true,
            loading: false,
            error: null,
          });

          return true;
        } catch (err) {
          set({
            loading: false,
            error: err.message || 'Sign in failed',
          });
          return false;
        }
      },

      /**
       * Sign out current user
       */
      signout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      /**
       * Clear error message
       */
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'campus-sync-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
