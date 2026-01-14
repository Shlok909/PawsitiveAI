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
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PawsightLogo } from "@/components/icons";
import {
  Home,
  Clock,
  User,
  PlusCircle,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { DisclaimerFooter } from "@/components/disclaimer-footer";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/history", icon: Clock, label: "History" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const dogAvatar = PlaceHolderImages.find(img => img.id === 'dog-avatar')?.imageUrl;

  if (isMobile) {
    return <MobileLayout>{children}</MobileLayout>
  }
  
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-20 items-center border-b px-4 lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <PawsightLogo className="h-8 w-8 text-primary" />
              <span className="text-xl">Pawsight AI</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.href && "bg-muted text-primary"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Button size="lg" className="w-full" asChild>
                <Link href="/analyze">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    New Analysis
                </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-20 items-center gap-4 border-b bg-card px-4 lg:px-6">
            <div className="flex-1">
                {/* Future Header content can go here */}
            </div>
          <UserMenu avatarUrl={dogAvatar} />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
          <DisclaimerFooter />
        </main>
      </div>
    </div>
  );
}

function MobileLayout({ children }: { children: React.ReactNode }){
    const pathname = usePathname();
    const dogAvatar = PlaceHolderImages.find(img => img.id === 'dog-avatar')?.imageUrl;
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <div className="flex min-h-screen w-full flex-col">
          <header className="sticky top-0 flex h-20 items-center gap-4 border-b bg-card px-4 md:px-6">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold mb-4"
                  >
                    <PawsightLogo className="h-8 w-8 text-primary" />
                    <span>Pawsight AI</span>
                  </Link>
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                        pathname === item.href && "bg-muted text-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto">
                    <Button size="lg" className="w-full" asChild>
                        <Link href="/analyze">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            New Analysis
                        </Link>
                    </Button>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex-1 text-center">
                <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-2 text-lg font-semibold"
                    >
                    <PawsightLogo className="h-8 w-8 text-primary" />
                </Link>
            </div>
            
            <UserMenu avatarUrl={dogAvatar} />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-background">
            {children}
            <DisclaimerFooter />
            </main>
        </div>
    )
}


function UserMenu({avatarUrl}: {avatarUrl?: string}) {
    return (
        <div className="relative">
            <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={avatarUrl} alt="User" data-ai-hint="user avatar" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            </Button>
        </div>
    )
}
