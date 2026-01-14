"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { PawsightLogo } from "@/components/icons";
import { DisclaimerFooter } from "@/components/disclaimer-footer";
import {
  Home,
  Clock,
  User,
  PlusCircle,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/history", icon: Clock, label: "History" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const dogAvatar = PlaceHolderImages.find(img => img.id === 'dog-avatar')?.imageUrl;

  if (isMobile) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-primary">
            <PawsightLogo className="h-7 w-7" />
            <span className="font-headline text-lg">Pawsight AI</span>
          </Link>
          <UserMenu />
        </header>
        <main className="flex-1">{children}</main>
        <nav className="sticky bottom-0 z-10 border-t bg-background/80 backdrop-blur-sm">
          <div className="mx-auto grid h-16 max-w-md grid-cols-4 items-center gap-2 px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-md p-2 text-sm font-medium",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
            <Link
              href="/analyze"
              className="flex flex-col items-center justify-center gap-1 text-sm font-medium text-accent"
            >
              <PlusCircle className="h-6 w-6" />
              <span>Analyze</span>
            </Link>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        className="border-r"
      >
        <SidebarHeader>
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-primary">
            <PawsightLogo className="h-7 w-7" />
            <span className="font-headline text-lg">Pawsight AI</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/analyze"}
                className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90"
                tooltip={{ children: "New Analysis" }}
              >
                <Link href="/analyze">
                  <PlusCircle />
                  New Analysis
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <UserMenu />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="max-h-screen overflow-y-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background/80 px-6 backdrop-blur-sm">
           <SidebarTrigger />
        </header>
        <main className="flex-1 p-2 md:p-6">
          {children}
          <DisclaimerFooter />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function UserMenu() {
    const dogAvatar = PlaceHolderImages.find(img => img.id === 'dog-avatar')?.imageUrl;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={dogAvatar} alt="User" data-ai-hint="user avatar" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">User</p>
                        <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
