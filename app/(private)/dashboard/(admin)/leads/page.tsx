import { checkUserAction } from '@/actions/auth/check-user';
import { prismaClient } from '@/lib/prisma-client';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await checkUserAction();
  if (user.role !== 'ADMIN') {
    return redirect('/dashboard');
  }

  const leads = await prismaClient.plansWaitList.findMany();

  return (
    <main className="h-full p-4">
      {leads.length === 0 && (
        <div className="flex flex-col gap-2">
          <h2>No leads found</h2>
        </div>
      )}

      {leads.map((lead) => (
        <div key={lead.email} className="flex flex-col gap-2">
          <h2>{lead.email}</h2>
          <p>{lead.createdAt.toString()}</p>
        </div>
      ))}
    </main>
  );
}
