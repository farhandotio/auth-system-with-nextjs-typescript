import connectDB from '@/lib/connectDB';
import { auth } from '@/auth';
import User from '@/models/user.model';
import { redirect } from 'next/navigation';
import LayoutClient from './LayoutClient';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await connectDB();
  const session = await auth();
  const user = await User.findById(session?.user?.id);

  if (!user) {
    redirect('/');
  }

  const plainUser = JSON.parse(JSON.stringify(user));

  return <LayoutClient user={plainUser}>{children}</LayoutClient>;
}
