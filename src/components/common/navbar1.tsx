
// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { 
//   Book, 
//   Menu, 
//   Sunset, 
//   Zap, 
//   LogOut, 
//   User, 
//   LayoutGrid, 
//   PlusCircle, 
//   Search 
// } from "lucide-react";

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { cn } from "@/lib/utils";
// import { ThemeToggle } from "../actions/theme-toggle";
// import { useAuth } from "@/context/AuthContext";

// interface MenuItem {
//   title: string;
//   url: string;
//   description?: string;
//   icon?: React.ReactNode;
//   items?: MenuItem[];
// }

// const menu: MenuItem[] = [
//   { title: "Explore", url: "/" },
//   {
//     title: "Community",
//     url: "#",
//     items: [
//       {
//         title: "Trending",
//         description: "See what the community is vibing with right now.",
//         icon: <Zap className="size-5 text-yellow-500" />,
//         url: "/trending",
//       },
//       {
//         title: "Recent Projects",
//         description: "Freshly deployed apps from fellow developers.",
//         icon: <Sunset className="size-5 text-purple-500" />,
//         url: "/recent",
//       },
//     ],
//   },
//   { title: "Pricing", url: "/pricing" },
// ];

// export function Navbar({ className }: { className?: string }) {
//   const { isLoggedIn, user, logout, isLoading } = useAuth();

//   return (
//     <section className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60", className)}>
//       <div className="container flex h-16 items-center justify-between px-4 overflow-visible">
        
//         {/* --- DESKTOP LEFT: Logo & Nav --- */}
//         <div className="hidden items-center gap-8 lg:flex">
//           <Link href="/" className="flex items-center gap-2">
//             <div className="rounded-lg bg-primary p-1">
//               <Zap className="size-6 text-primary-foreground fill-current" />
//             </div>
//             <span className="text-xl font-bold tracking-tight">VibeCode</span>
//           </Link>
          
//           <NavigationMenu>
//             <NavigationMenuList>
//               {menu.map((item) => (
//                 <NavigationMenuItem key={item.title}>
//                   {item.items ? (
//                     <>
//                       <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
//                       <NavigationMenuContent>
//                         <ul className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150">
//                           {item.items.map((subItem) => (
//                             <li key={subItem.title}>
//                               <NavigationMenuLink asChild>
//                                 <Link
//                                   href={subItem.url}
//                                   className="flex select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
//                                 >
//                                   <div className="mr-3 mt-1">{subItem.icon}</div>
//                                   <div>
//                                     <div className="text-sm font-medium leading-none">{subItem.title}</div>
//                                     <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                                       {subItem.description}
//                                     </p>
//                                   </div>
//                                 </Link>
//                               </NavigationMenuLink>
//                             </li>
//                           ))}
//                         </ul>
//                       </NavigationMenuContent>
//                     </>
//                   ) : (
//                     <Link href={item.url}  passHref>
//                       <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
//                         {item.title}
//                       </NavigationMenuLink>
//                     </Link>
//                   )}
//                 </NavigationMenuItem>
//               ))}
//             </NavigationMenuList>
//           </NavigationMenu>
//         </div>

//         {/* --- MOBILE LEFT: Logo --- */}
//         <div className="flex lg:hidden">
//           <Link href="/" className="flex items-center gap-2">
//              <Zap className="size-6 text-primary" />
//              <span className="font-bold">VibeCode</span>
//           </Link>
//         </div>

//         {/* --- RIGHT SIDE: Auth & Tools --- */}
//         <div className="flex items-center gap-4">
//           <div className="hidden items-center lg:flex">
//              <Button variant="ghost" size="icon" className="mr-2">
//                 <Search className="size-5" />
//              </Button>
//              <ThemeToggle />
//           </div>

//           {isLoading ? (
//             <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
//           ) : isLoggedIn ? (
//             <div className="flex items-center gap-4">
//               <Button asChild variant="default" size="sm" className="hidden lg:flex gap-2">
//                 <Link href="/projects/new">
//                   <PlusCircle className="size-4" /> Share Project
//                 </Link>
//               </Button>
              
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" className="relative h-9 w-9 rounded-full border border-primary/20 p-0">
//                     <Avatar className="h-8 w-8">
//                       <AvatarImage src={user?.avatarUrl} alt={user?.name} />
//                       <AvatarFallback className="bg-primary/10 text-primary font-bold">
//                         {user?.name?.charAt(0).toUpperCase()}
//                       </AvatarFallback>
//                     </Avatar>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="w-56" align="end" forceMount>
//                   <DropdownMenuLabel className="font-normal">
//                     <div className="flex flex-col space-y-1">
//                       <p className="text-sm font-medium leading-none">{user?.name}</p>
//                       <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
//                     </div>
//                   </DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem asChild>
//                     <Link href="/profile" className="cursor-pointer">
//                       <User className="mr-2 h-4 w-4" /> Profile
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem asChild>
//                     <Link href="/dashboard" className="cursor-pointer">
//                       <LayoutGrid className="mr-2 h-4 w-4" /> My Projects
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem 
//                     onClick={logout} 
//                     className="text-destructive focus:bg-destructive focus:text-destructive-foreground cursor-pointer"
//                   >
//                     <LogOut className="mr-2 h-4 w-4" /> Log out
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           ) : (
//             <div className="flex items-center gap-2">
//               <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
//                 <Link href="/login">Login</Link>
//               </Button>
//               <Button asChild size="sm">
//                 <Link href="/register">Get Started</Link>
//               </Button>
//             </div>
//           )}

//           {/* --- MOBILE HAMBURGER --- */}
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="outline" size="icon" className="lg:hidden">
//                 <Menu className="size-5" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right">
//               <SheetHeader className="text-left border-b pb-4">
//                 <SheetTitle>VibeCode Media</SheetTitle>
//               </SheetHeader>
//               <div className="flex flex-col gap-6 pt-6">
//                 <Accordion type="single" collapsible className="w-full">
//                   {menu.map((item) => (
//                     <AccordionItem key={item.title} value={item.title} className="border-none">
//                       {item.items ? (
//                         <>
//                           <AccordionTrigger className="py-2 hover:no-underline">{item.title}</AccordionTrigger>
//                           <AccordionContent>
//                             <div className="flex flex-col gap-2 pl-4">
//                               {item.items.map((sub) => (
//                                 <Link key={sub.title} href={sub.url} className="text-muted-foreground py-1 text-sm">
//                                   {sub.title}
//                                 </Link>
//                               ))}
//                             </div>
//                           </AccordionContent>
//                         </>
//                       ) : (
//                         <Link href={item.url} className="flex py-2 text-sm font-medium">
//                           {item.title}
//                         </Link>
//                       )}
//                     </AccordionItem>
//                   ))}
//                 </Accordion>
//                 <div className="flex flex-col gap-3 pt-6 border-t">
//                    <ThemeToggle />
//                    {isLoggedIn && (
//                      <Button variant="outline" onClick={logout} className="justify-start gap-2">
//                         <LogOut className="size-4" /> Logout
//                      </Button>
//                    )}
//                 </div>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </section>
//   );
// }


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
  Search 
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
        url: "/trending",
      },
      {
        title: "Recent Projects",
        description: "Freshly deployed apps from fellow developers.",
        icon: <Sunset className="size-5 text-purple-500" />,
        url: "/recent",
      },
    ],
  },
  { title: "Pricing", url: "/pricing" },
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
                    <Link href="/profile" className="cursor-pointer flex items-center">
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer flex items-center">
                      <LayoutGrid className="mr-2 h-4 w-4" /> My Projects
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
              <div className="flex flex-col gap-2 pt-4">
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
                   {isLoggedIn && (
                     <Button variant="outline" onClick={logout} className="w-full justify-start gap-2 rounded-xl text-destructive">
                        <LogOut className="size-4" /> Logout
                     </Button>
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