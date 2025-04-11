import { prismaClient } from '@/lib/prisma-client';

export default async function Page() {
  const notifications = await prismaClient.notifications.findMany();

  return (
    <div className="p-6 flex flex-col gap-4 bg-background">
      <h2 className="text-3xl font-bold">Releases</h2>

      <ul className="relative flex-1 pr-4 h-full">
        <div className="h-fit border-l flex flex-col justify-between gap-10 border-muted">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="ml-4 h-40 bg-secondary rounded-md shadow-sm"
            >
              <section id={notification.slug} className="relative h-full">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-5.5 top-16" />

                <div className="flex flex-col gap-2 p-4">
                  <h3 className="text-xl font-semibold">{notification.name}</h3>
                  <time className="text-sm text-muted-foreground">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </time>
                  <p>{notification.description}</p>
                </div>
              </section>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
