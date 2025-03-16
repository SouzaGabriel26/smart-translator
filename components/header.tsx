import { logout } from '@/actions/auth/logout';
import type { Users as User } from '@prisma/client';
import { Globe, LogOutIcon, User2Icon } from 'lucide-react';
import Link from 'next/link';
import { MenuIcon } from './menu-icon';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

type HeaderProps = {
  user?: User;
};

export function Header({ user }: HeaderProps) {
  const defaultPath = user ? '/dashboard' : '/';

  return (
    <header className="sticky top-0 z-50 text-black border-b backdrop-blur h-16 bg-background/60 flex justify-between items-center px-4">
      <Link href={defaultPath} className="flex items-center gap-2">
        <Globe className="size-6" />
        <h1 className="text-2xl font-bold">Smart Translator</h1>
      </Link>

      {user ? <UserOptions /> : <AuthOptions />}
    </header>
  );

  function AuthOptions() {
    return (
      <div className="flex gap-2 items-center">
        <Button asChild variant="ghost">
          <Link href="/auth/sign-in">Log in</Link>
        </Button>

        <Button asChild>
          <Link href="/auth/sign-up">Sign up</Link>
        </Button>
      </div>
    );
  }

  function UserOptions() {
    if (!user) return null;

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button>
            <MenuIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          <div className="space-y-2 flex flex-col">
            <span>Hello, {user.name}</span>

            <Button asChild variant="ghost">
              <Link href="/profile">
                <User2Icon />
                Profile
              </Link>
            </Button>

            <form action={logout}>
              <Button className="w-full" variant="destructive">
                <LogOutIcon />
                Logout
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
}
