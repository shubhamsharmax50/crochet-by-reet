import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function getAdminSession() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { user: null, isAdmin: false };

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return { user: null, isAdmin: false };

  const { data: admin, error: adminError } = await supabase
    .from('admin_users')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle();

  return { user, isAdmin: !adminError && Boolean(admin) };
}
