import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, getSession, getCurrentUser } from '../lib/supabase-client';

// Define the shape of our context
interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signIn: async () => ({ error: null, data: null }),
  signOut: async () => {},
  isAuthenticated: false,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

// Helper function to ensure mock user conforms to User type
const createMockUser = (): User => {
  // Cast to unknown first, then to User to avoid TypeScript errors
  return {
    id: 'demo-user-id',
    aud: 'authenticated',
    created_at: new Date().toISOString(),
    email: 'admin@example.com',
    user_metadata: {
      name: 'Admin User'
    },
    app_metadata: {
      role: 'admin'
    },
    role: '',
    updated_at: new Date().toISOString(),
    confirmed_at: new Date().toISOString(),
    last_sign_in_at: new Date().toISOString(),
    phone: '',
    confirmation_sent_at: '',
    recovery_sent_at: '',
    email_confirmed_at: new Date().toISOString(),
    phone_confirmed_at: undefined,
    banned_until: undefined,
    reauthentication_sent_at: undefined,
    action_link: undefined
  } as unknown as User;
};

// Helper function to ensure mock session conforms to Session type
const createMockSession = (mockUser: User): Session => {
  return {
    access_token: 'mock-token',
    refresh_token: 'mock-refresh-token',
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    token_type: 'bearer',
    user: mockUser
  } as Session;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Get the initial session
    const initializeAuth = async () => {
      setLoading(true);
      try {
        // Get the current session
        const sessionResponse = await getSession();
        
        // Handle both Supabase and mock session formats
        const currentSession = sessionResponse.data?.session;
        
        if (currentSession) {
          setSession(currentSession as Session);
          
          // Get the user details if we have a session
          const userResponse = await getCurrentUser();
          const currentUser = userResponse.data?.user;
          
          if (currentUser) {
            setUser(currentUser as User);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Set up a listener for auth changes (only if not using mock data)
    const useMockData = process.env.REACT_APP_ENABLE_MOCK_DATA === 'true';
    let authListener: any = null;
    
    if (!useMockData) {
      const { data } = supabase.auth.onAuthStateChange(
        async (event: any, newSession: any) => {
          if (newSession) {
            setSession(newSession as Session);
            
            const userResponse = await getCurrentUser();
            const currentUser = userResponse.data?.user;
            
            if (currentUser) {
              setUser(currentUser as User);
            }
          } else {
            setSession(null);
            setUser(null);
          }
          
          setLoading(false);
        }
      );
      authListener = data;
    }

    // Clean up the listener when the component unmounts
    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      // For demo purposes, allow login with admin@example.com/password123
      if (email === 'admin@example.com' && password === 'password123') {
        // Create a mock user and session
        const mockUser = createMockUser();
        const mockSession = createMockSession(mockUser);
        
        // Set the user and session
        setUser(mockUser);
        setSession(mockSession);
        
        return {
          data: { user: mockUser, session: mockSession },
          error: null
        };
      }
      
      // If not using demo credentials, try actual Supabase auth
      const useMockData = process.env.REACT_APP_ENABLE_MOCK_DATA === 'true';
      if (!useMockData) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        return { data, error };
      } else {
        // Return error for invalid credentials in mock mode
        return {
          data: null,
          error: { message: 'Invalid credentials. Use admin@example.com / password123 for demo.' }
        };
      }
    } catch (error) {
      console.error('Error signing in:', error);
      return { data: null, error };
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      const useMockData = process.env.REACT_APP_ENABLE_MOCK_DATA === 'true';
      if (!useMockData) {
        await supabase.auth.signOut();
      }
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Determine if the user is authenticated
  const isAuthenticated = !!user && !!session;

  // The value that will be provided to consumers of this context
  const value = {
    session,
    user,
    loading,
    signIn,
    signOut,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;