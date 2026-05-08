import connectDB from '@/lib/connectDB';
import { auth } from '@/auth';
import User from '@/models/user.model';
import { redirect } from 'next/navigation';
import EditRoleAndPhone from '@/components/EditRoleAndPhone';
import Navbar from '@/components/Navbar';

export default async function homePage() {
  await connectDB();
  const session = await auth();
  const user = await User.findById(session?.user?.id);
  // if (!user) {
  //   redirect('/login');
  // }
  const incomoplete = !user?.role || !user?.phone || (!user?.phone && user?.role == 'user');
  if (user && incomoplete) {
    return <EditRoleAndPhone />;
  }

  const plainUser = JSON.parse(JSON.stringify(user));

  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col items-center justify-center">
      <Navbar user={plainUser} />
    </div>
  );
}
