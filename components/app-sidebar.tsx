'use client';

import { type ReactNode, useEffect, useState } from 'react';

import { logout } from '@/actions/auth/logout';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import type { AppLanguageContext } from '@/config/app-language-context';
import {
  BarChart,
  BellIcon,
  Globe,
  Languages,
  Newspaper,
  Table,
  User2Icon,
} from 'lucide-react';
import Link from 'next/link';
import { CreateNotificationButton } from './create-notification-button';

type SidebarLanguage = keyof AppLanguageContext['sidebar'];

type SidebarProps = Array<{
  title: SidebarLanguage;
  isAdmin?: boolean;
  items: Array<{
    title: SidebarLanguage;
    url?: string;
    icon?: ReactNode;
    isEnabled: boolean;
  }>;
}>;

const sidebarItems: SidebarProps = [
  {
    title: 'navigation',
    items: [
      {
        title: 'home',
        url: '/dashboard',
        icon: <Languages className="size-6" />,
        isEnabled: true,
      },
      {
        title: 'usageAndLimits',
        url: '#',
        icon: <BarChart className="size-6" />,
        isEnabled: false,
      },
    ],
  },
  {
    title: 'user',
    items: [
      {
        title: 'profile',
        url: '/dashboard/profile',
        icon: <User2Icon className="size-6" />,
        isEnabled: true,
      },
      {
        title: 'releaseNotes',
        url: '/dashboard/releases',
        icon: <Newspaper className="size-6" />,
        isEnabled: true,
      },
    ],
  },
  {
    title: 'cms',
    isAdmin: true,
    items: [
      {
        title: 'leads',
        url: '/dashboard/leads',
        icon: <Table className="size-6" />,
        isEnabled: true,
      },
      {
        title: 'createNotification',
        icon: <BellIcon className="size-6" />,
        isEnabled: true,
      },
    ],
  },
  {
    title: 'languagePairs',
    items: [
      {
        title: 'englishToPortuguese',
        isEnabled: false,
      },
      {
        title: 'portugueseToEnglish',
        isEnabled: false,
      },
    ],
  },
];

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  appTitle: string;
  sidebarLanguage: AppLanguageContext['sidebar'];
  userIsAdmin?: boolean;
};

export function AppSidebar({
  appTitle,
  sidebarLanguage,
  userIsAdmin,
  ...props
}: AppSidebarProps) {
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    const currentPath = window.location.pathname;

    const activeItem = sidebarItems
      .flatMap((group) => group.items)
      .find((item) => item.url === currentPath);

    if (activeItem) {
      setActiveItem(activeItem.url ?? '');
    } else {
      setActiveItem('');
    }
  }, []);

  const defaultPath = '/dashboard';

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 px-4 justify-center">
        <Link href={defaultPath} className="flex items-center gap-2">
          <Globe className="size-6 text-primary" />
          <h1 className="md:text-xl font-bold">{appTitle}</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {sidebarItems.map(({ items, title, isAdmin: isAdminRoute }) => {
          const isGroupVisible = isAdminRoute ? userIsAdmin : true;

          if (!isGroupVisible) return;

          return (
            <SidebarGroup key={title}>
              <SidebarGroupLabel>{sidebarLanguage[title]}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map(({ title, url, icon, isEnabled }) => (
                    <SidebarMenuItem key={title}>
                      {url && (
                        <SidebarMenuButton
                          disabled={!isEnabled}
                          asChild
                          isActive={activeItem === url}
                          onClick={() => setActiveItem(url)}
                        >
                          <Link href={url} aria-disabled={!isEnabled}>
                            {icon}
                            {sidebarLanguage[title]}
                          </Link>
                        </SidebarMenuButton>
                      )}

                      {!url && title === 'createNotification' && (
                        <CreateNotificationButton modalTitle="Create Notification">
                          <Button
                            variant="ghost"
                            className="flex justify-start w-full px-2"
                          >
                            <BellIcon className="size-6" />
                            {sidebarLanguage[title]}
                          </Button>
                        </CreateNotificationButton>
                      )}

                      {!url && title !== 'createNotification' && (
                        <SidebarMenuButton
                          disabled={!isEnabled}
                          asChild
                          isActive={activeItem === url}
                          onClick={() => {
                            console.log('Clicked', title);
                          }}
                        >
                          <Button
                            variant="ghost"
                            className="flex justify-start"
                          >
                            {sidebarLanguage[title]}
                          </Button>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarRail />

      <SidebarFooter>
        <form action={logout} className="w-full">
          <Button variant="destructive" className="w-full">
            Logout
          </Button>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}
