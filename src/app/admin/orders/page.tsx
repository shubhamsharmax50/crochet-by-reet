import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/supabase/admin-auth';
import OrdersDashboard from './OrdersDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const { user, isAdmin } = await getAdminSession();

  if (!isAdmin) {
    redirect('/admin/login');
  }

  return <OrdersDashboard adminEmail={user?.email ?? ''} />;
}
