import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseKey, serviceRolKey } from './supabase';
import { createBrowserClient } from '@supabase/ssr';

export const supabaseClient = createBrowserClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true, // 세션 유지 활성화
    autoRefreshToken: true, // 토큰 자동 갱신 활성화
  },
});
export const admin = createClient(supabaseUrl, serviceRolKey);
