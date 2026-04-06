// "use client";

// import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";

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
// import { cn } from "@/lib/utils";
// import { ThemeToggle } from "../actions/theme-toggle";
// import Link from "next/link";

// interface MenuItem {
//   title: string;
//   url: string;
//   description?: string;
//   icon?: React.ReactNode;
//   items?: MenuItem[];
// }

// interface Navbar1Props {
//   className?: string;
//   logo?: {
//     url: string;
//     src: string;
//     alt: string;
//     title: string;
//     className?: string;
//   };
//   menu?: MenuItem[];
//   auth?: {
//     login: {
//       title: string;
//       url: string;
//     };
//     signup: {
//       title: string;
//       url: string;
//     };
//   };
// }

// const Navbar1 = ({
//   logo = {
//     url: "/",
//     src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
//     alt: "logo",
//     title: "VibeCode Media",
//   },
//   menu = [
//     { title: "Home", url: "#" },
//     {
//       title: "Products",
//       url: "#",
//       items: [
//         {
//           title: "Blog",
//           description: "The latest industry news, updates, and info",
//           icon: <Book className="size-5 shrink-0" />,
//           url: "#",
//         },
//         {
//           title: "Company",
//           description: "Our mission is to innovate and empower the world",
//           icon: <Trees className="size-5 shrink-0" />,
//           url: "#",
//         },
//         {
//           title: "Careers",
//           description: "Browse job listing and discover our workspace",
//           icon: <Sunset className="size-5 shrink-0" />,
//           url: "#",
//         },
//         {
//           title: "Support",
//           description:
//             "Get in touch with our support team or visit our community forums",
//           icon: <Zap className="size-5 shrink-0" />,
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Resources",
//       url: "#",
//       items: [
//         {
//           title: "Help Center",
//           description: "Get all the answers you need right here",
//           icon: <Zap className="size-5 shrink-0" />,
//           url: "#",
//         },
//         {
//           title: "Contact Us",
//           description: "We are here to help you with any questions you have",
//           icon: <Sunset className="size-5 shrink-0" />,
//           url: "#",
//         },
//         {
//           title: "Status",
//           description: "Check the current status of our services and APIs",
//           icon: <Trees className="size-5 shrink-0" />,
//           url: "#",
//         },
//         {
//           title: "Terms of Service",
//           description: "Our terms and conditions for using our services",
//           icon: <Book className="size-5 shrink-0" />,
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Pricing",
//       url: "#",
//     },
//     {
//       title: "Blog",
//       url: "#",
//     },
//   ],
//   auth = {
//     login: { title: "Login", url: "/login" },
//     signup: { title: "Sign up", url: "/register" },
//   },
//   className,
// }: Navbar1Props) => {
//   return (
//     <section className={cn("py-4 sticky", className)}>
//       <div className="container">
//         {/* Desktop Menu */}
//         <nav className="hidden items-center justify-between lg:flex">
//           <div className="flex items-center gap-6">
//             {/* Logo */}
//             <a href={logo.url} className="flex items-center gap-2">
//               <img
//                 src={logo.src}
//                 className="max-h-8 dark:invert"
//                 alt={logo.alt}
//               />
//               <span className="text-lg font-semibold tracking-tighter">
//                 {logo.title}
//               </span>
//             </a>
//             <div className="flex items-center">
//               <NavigationMenu>
//                 <NavigationMenuList>
//                   {menu.map((item) => renderMenuItem(item))}
//                 </NavigationMenuList>
//               </NavigationMenu>
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <ThemeToggle />
//             <Button asChild variant="outline" size="sm">
//               <a href={auth.login.url}>{auth.login.title}</a>
//             </Button>
//             <Button asChild size="sm">
//               <a href={auth.signup.url}>{auth.signup.title}</a>
//             </Button>
//           </div>
//         </nav>

//         {/* Mobile Menu */}
//         <div className="block lg:hidden">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <a href={logo.url} className="flex items-center gap-2">
//               <img
//                 src={logo.src}
//                 className="max-h-8 dark:invert"
//                 alt={logo.alt}
//               />
//             </a>
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="outline" size="icon">
//                   <Menu className="size-4" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent className="overflow-y-auto">
//                 <SheetHeader>
//                   <SheetTitle>
//                     <a href={logo.url} className="flex items-center gap-2">
//                       <img
//                         src={logo.src}
//                         className="max-h-8 dark:invert"
//                         alt={logo.alt}
//                       />
//                     </a>
//                   </SheetTitle>
//                 </SheetHeader>
//                 <div className="flex flex-col gap-6 p-4">
//                   <Accordion
//                     type="single"
//                     collapsible
//                     className="flex w-full flex-col gap-4"
//                   >
//                     {menu.map((item) => renderMobileMenuItem(item))}
//                   </Accordion>

//                   <div className="flex flex-col gap-3">
//                     <ThemeToggle />
//                     <Button asChild variant="outline">
//                       <Link href={auth.login.url}>{auth.login.title}</Link>
//                     </Button>
//                     <Button asChild>
//                       <Link href={auth.signup.url}>{auth.signup.title}</Link>
//                     </Button>
//                   </div>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const renderMenuItem = (item: MenuItem) => {
//   if (item.items) {
//     return (
//       <NavigationMenuItem key={item.title}>
//         <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
//         <NavigationMenuContent className="bg-popover text-popover-foreground">
//           {item.items.map((subItem) => (
//             <NavigationMenuLink asChild key={subItem.title} className="w-80">
//               <SubMenuLink item={subItem} />
//             </NavigationMenuLink>
//           ))}
//         </NavigationMenuContent>
//       </NavigationMenuItem>
//     );
//   }

//   return (
//     <NavigationMenuItem key={item.title}>
//       <NavigationMenuLink
//         href={item.url}
//         className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
//       >
//         {item.title}
//       </NavigationMenuLink>
//     </NavigationMenuItem>
//   );
// };

// const renderMobileMenuItem = (item: MenuItem) => {
//   if (item.items) {
//     return (
//       <AccordionItem key={item.title} value={item.title} className="border-b-0">
//         <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
//           {item.title}
//         </AccordionTrigger>
//         <AccordionContent className="mt-2">
//           {item.items.map((subItem) => (
//             <SubMenuLink key={subItem.title} item={subItem} />
//           ))}
//         </AccordionContent>
//       </AccordionItem>
//     );
//   }

//   return (
//     <a key={item.title} href={item.url} className="text-md font-semibold">
//       {item.title}
//     </a>
//   );
// };

// const SubMenuLink = ({ item }: { item: MenuItem }) => {
//   return (
//     <a
//       className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
//       href={item.url}
//     >
//       <div className="text-foreground">{item.icon}</div>
//       <div>
//         <div className="text-sm font-semibold">{item.title}</div>
//         {item.description && (
//           <p className="text-sm leading-snug text-muted-foreground">
//             {item.description}
//           </p>
//         )}
//       </div>
//     </a>
//   );
// };

// export { Navbar1 };


"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Book, 
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
import { ThemeToggle } from "../actions/theme-toggle";
import { useAuth } from "@/context/AuthContext";

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
    <section className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container flex h-16 items-center justify-between px-4">
        
        {/* --- DESKTOP LEFT: Logo & Nav --- */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-1">
              <Zap className="size-6 text-primary-foreground fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tight">VibeCode</span>
          </Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              {menu.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.items ? (
                    <>
                      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.items.map((subItem) => (
                            <li key={subItem.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.url}
                                  className="flex select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="mr-3 mt-1">{subItem.icon}</div>
                                  <div>
                                    <div className="text-sm font-medium leading-none">{subItem.title}</div>
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
                    <Link href={item.url} legacyBehavior passHref>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* --- MOBILE LEFT: Logo --- */}
        <div className="flex lg:hidden">
          <Link href="/" className="flex items-center gap-2">
             <Zap className="size-6 text-primary" />
             <span className="font-bold">VibeCode</span>
          </Link>
        </div>

        {/* --- RIGHT SIDE: Auth & Tools --- */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center lg:flex">
             <Button variant="ghost" size="icon" className="mr-2">
                <Search className="size-5" />
             </Button>
             <ThemeToggle />
          </div>

          {isLoading ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
          ) : isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Button asChild variant="default" size="sm" className="hidden lg:flex gap-2">
                <Link href="/projects/new">
                  <PlusCircle className="size-4" /> Share Project
                </Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full border border-primary/20 p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <LayoutGrid className="mr-2 h-4 w-4" /> My Projects
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout} 
                    className="text-destructive focus:bg-destructive focus:text-destructive-foreground cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}

          {/* --- MOBILE HAMBURGER --- */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader className="text-left border-b pb-4">
                <SheetTitle>VibeCode Media</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {menu.map((item) => (
                    <AccordionItem key={item.title} value={item.title} className="border-none">
                      {item.items ? (
                        <>
                          <AccordionTrigger className="py-2 hover:no-underline">{item.title}</AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col gap-2 pl-4">
                              {item.items.map((sub) => (
                                <Link key={sub.title} href={sub.url} className="text-muted-foreground py-1 text-sm">
                                  {sub.title}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </>
                      ) : (
                        <Link href={item.url} className="flex py-2 text-sm font-medium">
                          {item.title}
                        </Link>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>
                <div className="flex flex-col gap-3 pt-6 border-t">
                   <ThemeToggle />
                   {isLoggedIn && (
                     <Button variant="outline" onClick={logout} className="justify-start gap-2">
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
