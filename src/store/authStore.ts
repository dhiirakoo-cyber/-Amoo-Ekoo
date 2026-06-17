import { create } from 'zustand';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

export type UserRole = 'student' | 'instructor' | 'admin';

export interface UserProfile {
  id: string;
  role: UserRole;
  full_name: string | null;
  avatar_url: string | null;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  profile: null,
  isLoading: true,

  initialize: async () => {
    if (!isSupabaseConfigured) {
      set({ user: null, session: null, profile: null, isLoading: false });
      return;
    }

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;

      if (!session?.user) {
        set({ user: null, session: null, profile: null, isLoading: false });
        return;
      }

      // Fetch profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError.message);
      }

      let userProfile = profile as UserProfile | null;
      if (!userProfile && session?.user) {
        userProfile = {
          id: session.user.id,
          role: 'student',
          full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Student',
          avatar_url: null,
        };
      }

      set({
        user: session.user,
        session,
        profile: userProfile,
        isLoading: false,
      });

      // Set up auth state listener
      supabase.auth.onAuthStateChange(async (event, newSession) => {
        if (event === 'SIGNED_OUT') {
          set({ user: null, session: null, profile: null });
        } else if (newSession?.user) {
          const { data: newProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', newSession.user.id)
            .single();

          let userProfile = newProfile as UserProfile | null;
          if (!userProfile && newSession.user) {
            userProfile = {
              id: newSession.user.id,
              role: 'student',
              full_name: newSession.user.user_metadata?.full_name || newSession.user.email?.split('@')[0] || 'Student',
              avatar_url: null,
            };
          }

          set({
            user: newSession.user,
            session: newSession,
            profile: userProfile,
          });
        }
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ user: null, session: null, profile: null, isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true });
      await supabase.auth.signOut();
      set({ user: null, session: null, profile: null, isLoading: false });
    } catch (error) {
      console.error('Sign out error:', error);
      set({ isLoading: false });
    }
  },
}));
