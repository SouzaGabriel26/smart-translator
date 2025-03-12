import { logout } from "@/actions/auth/logout";
import { MenuIcon } from "./menu-icon";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type HeaderProps = {
  name: string;
}

export function Header({ name }: HeaderProps) {
  return (
    <header className="bg-black text-white h-16 flex justify-between items-center px-4">
      <h1 className="text-2xl font-bold">Smart Translator</h1>

      <Popover>
        <PopoverTrigger asChild>
          <Button>
            <MenuIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          <div className="space-y-2">
            <span>Hello, {name}</span>
            <form action={logout}>
              <Button className="w-full">Logout</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </header>
  )
}
