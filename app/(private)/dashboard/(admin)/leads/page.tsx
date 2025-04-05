import { checkUserAction } from '@/actions/auth/check-user';
import { prismaClient } from '@/lib/prisma-client';
import { redirect } from 'next/navigation';
import { type Lead, LeadsTable } from './_components/leads-table';

export default async function Page() {
  const user = await checkUserAction();
  if (user.role !== 'ADMIN') {
    return redirect('/dashboard');
  }

  const foundLeads = await prismaClient.plansWaitList.findMany({
    include: {
      plan: true,
    },
  });

  const leads: Lead[] = foundLeads.map((lead) => ({
    email: lead.email,
    createdAt: lead.createdAt,
    updatedAt: lead.updatedAt,
    planId: lead.planId,
    name: lead.plan.name,
    price: lead.plan.price,
    translationsLimit: lead.plan.translationsLimit,
    active: lead.plan.active,
  }));

  return (
    <main className="p-4 flex flex-col bg-background h-[calc(100%-64px)] overflow-hidden md:mx-36  gap-8">
      <h1 className="font-bold text-2xl">Leads</h1>
      <LeadsTable data={leads} />
    </main>
  );
}
