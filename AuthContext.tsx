import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase-client';

// Define the context type
type AuthContextType = {
  session: Session | null;
  user: User | null;
  userProfile: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data?: { user: User | null; session: Session | null };
  }>;
  signOut: () => Promise<{ error: Error | null }>;
  resetPassword: (email: string) => Promise<{
    error: Error | null;
    data?: { user: User | null };
  }>;
  updatePassword: (password: string) => Promise<{
    error: Error | null;
    data?: { user: User | null };
  }>;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  userProfile: null,
  loading: true,
  signIn: async () => ({ error: new Error('Not implemented') }),
  signOut: async () => ({ error: new Error('Not implemented') }),
  resetPassword: async () => ({ error: new Error('Not implemented') }),
  updatePassword: async () => ({ error: new Error('Not implemented') }),
});

// Create the provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize the auth state
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      
      // Get the user profile if user exists
      if (session?.user) {
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        setUserProfile(data);
      }
      
      setLoading(false);
      
      // Listen for auth state changes
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(
        async (_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          
          // Get the user profile if user exists
          if (session?.user) {
            const { data } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            setUserProfile(data);
          } else {
            setUserProfile(null);
          }
        }
      );
      
      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initializeAuth();
  }, []);
  
  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error signing in:', error);
      return { error: error as Error };
    }
  };
  
  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error signing out:', error);
      return { error: error as Error };
    }
  };
  
  // Reset password
  const resetPassword = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error resetting password:', error);
      return { error: error as Error };
    }
  };
  
  // Update password
  const updatePassword = async (password: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password,
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating password:', error);
      return { error: error as Error };
    }
  };
  
  // Create the context value
  const value = {
    session,
    user,
    userProfile,
    loading,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};