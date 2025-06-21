"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { doesUserExist } from "@/app/actions/userActions";
const HoveredLink = ({ children, href, ...rest }: any) => {
  return (
    <Link
      {...rest}
      href={href}
      className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-2 py-1 rounded transition-colors"
    >
      {children}
    </Link>
  );
};

const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <p className="cursor-pointer text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
        {item}
      </p>
      {active === item && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg min-w-[200px]">
            <div className="p-4">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const MenuWrapper = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="flex items-center gap-6 text-sm font-medium"
    >
      {children}
    </nav>
  );
};

export default function Navbar() {
  const pathname = usePathname();
  const [dashboardUrl, setDashboardUrl] = useState<string>("/");
  const [active, setActive] = useState<string | null>(null);

  const setHomeUrl = async function (slug: string) {
    const user = await doesUserExist(slug);
    if (user.status === "success") setDashboardUrl(`/${user.data}`);
    else setDashboardUrl("/");
  };
  useEffect(() => {
    const segments = pathname.split("/");
    console.log(segments);
    const slug = segments[1];
    setHomeUrl(slug);
  }, [pathname]);

  const { setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            BudgetBuddy
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <MenuWrapper setActive={setActive}>
            <Link
              href={dashboardUrl}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Dashboard
            </Link>
            <Link
              href={dashboardUrl + "/transactions"}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Transactions
            </Link>
            {/* <Link
            href={dashboardUrl + "/charts"}
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            prefetch={false}
          > */}
            <MenuItem setActive={setActive} active={active} item="Charts">
              <div className="flex flex-col space-y-2">
                <HoveredLink href={dashboardUrl + "/charts"}>
                  Monthly Expenses
                </HoveredLink>
                <HoveredLink href={dashboardUrl + "/charts/categories"}>
                  Categoric Expenses
                </HoveredLink>
              </div>
            </MenuItem>
            {/* </Link> */}
            <Link
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              Contact
            </Link>
          </MenuWrapper>
        </nav>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
              >
                <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <div className="grid gap-4 p-4">
                <Link
                  href={dashboardUrl}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  Dashboard
                </Link>
                <Link
                  href={dashboardUrl + "/transactions"}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  Transactions
                </Link>
                {/* <Link
                  href={dashboardUrl + "/charts"}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  prefetch={false}
                > */}
                {/* Mobile Charts Menu */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Charts
                  </p>
                  <div className="ml-4 space-y-2">
                    <Link
                      href={dashboardUrl + "/charts/monthly"}
                      className="block text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                      prefetch={false}
                    >
                      Monthly Expenses
                    </Link>
                    <Link
                      href={dashboardUrl + "/charts/categories"}
                      className="block text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                      prefetch={false}
                    >
                      Categoric Expenses
                    </Link>
                  </div>
                </div>
                {/* </Link> */}
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  Contact
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
