
"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Menu, 
  Sunset, 
  Zap, 
  LogOut, 
  User, 
  LayoutGrid, 
  PlusCircle, 
  Search,
  Star,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../actions/theme-toggle"; // Verify this path
import { useAuth } from "@/context/AuthContext";
import { UserAvatar } from "./UserAvatar";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

const menu: MenuItem[] = [
  { title: "Explore", url: "/" },
  {
    title: "Community",
    url: "#",
    items: [
      {
        title: "Trending",
        description: "See what the community is vibing with right now.",
        icon: <Zap className="size-5 text-yellow-500" />,
        url: "/",
      },
      {
        title: "Recent Projects",
        description: "Freshly deployed apps from fellow developers.",
        icon: <Sunset className="size-5 text-purple-500" />,
        url: "/",
      },
    ],
  },
  { title: "LeaderBoard", url: "/leaderboard" },
];

export function Navbar({ className }: { className?: string }) {
  const { isLoggedIn, user, logout, isLoading } = useAuth();

  return (
    <section className={cn("sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md", className)}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* --- DESKTOP LEFT --- */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="rounded-xl bg-primary p-1.5 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <Zap className="size-5 text-primary-foreground fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tight">VibeCode</span>
          </Link>
          
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {menu.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.items ? (
                    <>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50 transition-colors">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.items.map((subItem) => (
                            <li key={subItem.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.url}
                                  className="flex select-none gap-4 rounded-xl p-3 leading-none no-underline outline-none transition-all hover:bg-primary/5 hover:text-accent-foreground focus:bg-accent"
                                >
                                  <div className="flex size-10 items-center justify-center rounded-lg border bg-background shadow-sm">
                                    {subItem.icon}
                                  </div>
                                  <div className="space-y-1">
                                    <div className="text-sm font-semibold leading-none">{subItem.title}</div>
                                    <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                      {subItem.description}
                                    </p>
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link 
                        href={item.url}
                        className="group inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* --- MOBILE LEFT --- */}
        <div className="flex lg:hidden">
          <Link href="/" className="flex items-center gap-2">
             <Zap className="size-6 text-primary" />
             <span className="font-bold">VibeCode</span>
          </Link>
        </div>

        {/* --- RIGHT SIDE: Auth & Tools --- */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center lg:flex gap-1">
             <Button variant="ghost" size="icon" className="rounded-full">
                <Search className="size-5" />
             </Button>
             <ThemeToggle />
          </div>

          {isLoading ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
          ) : isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Button asChild variant="default" size="sm" className="hidden lg:flex gap-2 rounded-full">
                <Link href="/projects/new">
                  <PlusCircle className="size-4" /> Share Project
                </Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full border border-primary/20 p-0">
                    <UserAvatar
                      name={user?.name || ""}
                      avatarUrl={user?.avatarUrl}
                      size="sm"
                      showBorder={false}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="cursor-pointer flex items-center">
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer flex items-center">
                      <LayoutGrid className="mr-2 h-4 w-4" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout} 
                    className="text-destructive focus:bg-destructive focus:text-destructive-foreground cursor-pointer flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex rounded-full">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}

          {/* --- MOBILE HAMBURGER --- */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden rounded-full">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader className="text-left border-b pb-4">
                <SheetTitle className="flex items-center gap-2">
                  <Zap className="size-5 text-primary" /> VibeCode
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 pt-4">
                <Button asChild variant="secondary" className="w-full rounded-full">
                  <Link href="/projects/new">Post Project</Link>
                </Button>
                <Accordion type="single" collapsible className="w-full">
                  {menu.map((item) => (
                    <AccordionItem key={item.title} value={item.title} className="border-none">
                      {item.items ? (
                        <>
                          <AccordionTrigger className="py-3 px-2 hover:no-underline hover:bg-accent rounded-lg">
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col gap-1 pl-4 pt-1">
                              {item.items.map((sub) => (
                                <Link 
                                  key={sub.title} 
                                  href={sub.url} 
                                  className="text-muted-foreground hover:text-primary py-2 text-sm transition-colors"
                                >
                                  {sub.title}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </>
                      ) : (
                        <Link 
                          href={item.url} 
                          className="flex py-3 px-2 text-sm font-medium hover:bg-accent rounded-lg transition-colors"
                        >
                          {item.title}
                        </Link>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>
                <div className="flex flex-col gap-4 pt-6 border-t mt-4">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-sm text-muted-foreground">Appearance</span>
                    <ThemeToggle />
                  </div>
                  {!isLoggedIn ? (
                    <div className="flex flex-col gap-2 px-2">
                      <Button asChild variant="outline" className="w-full rounded-full">
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button asChild className="w-full rounded-full">
                        <Link href="/register">Get Started</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 px-2">
                      <Button asChild variant="outline" className="w-full rounded-full justify-start gap-2">
                        <Link href="/dashboard/profile">Profile</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full rounded-full justify-start gap-2">
                        <Link href="/dashboard">Dashboard</Link>
                      </Button>
                      <Button variant="destructive" onClick={logout} className="w-full rounded-full">
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
}