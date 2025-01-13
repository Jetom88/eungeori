import { useCallback, useEffect } from 'react';
import { supabaseClient } from '../_lib/supabaseClient';
import { IMAGE_SRC, useUserInfoStore } from '../_store/user/userStore';
import { Session } from '@supabase/supabase-js';
import { useProfileState } from '../my/_hook/useUserProfile';

const useAuthState = () => {
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);
  const resetUserInfo = useUserInfoStore((state) => state.resetUserInfo);
  const fetchUserProfile = useProfileState().fetchUserProfile;

  const getUserProfile = useCallback(async (userId: string) => {
    try {
      const { data: profile } = await supabaseClient
        .from('user_profile')
        .select('avatar_url')
        .eq('id', userId)
        .single();

      return profile?.avatar_url || IMAGE_SRC;
    } catch (e) {
      return IMAGE_SRC;
    }
  }, []);

  const handleSession = useCallback(async (session: Session | null) => {
    try {
      if (session) {
        const { id, user_metadata } = session.user;
        const nickname = user_metadata.nickname || 'Guest';
        const avatarUrl = await getUserProfile(id);

        setUserInfo({
          id,
          nickname,
          avatarUrl,
        });
      }
    } catch {
      resetUserInfo();
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data, error } = await supabaseClient.auth.getSession();
        if (error) throw error;
        await handleSession(data.session);
      } catch (e) {
        resetUserInfo();
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(async (e, session) => {
      if (session?.user) {
        fetchUserProfile();
      } else {
        resetUserInfo();
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);
};

export default useAuthState;
