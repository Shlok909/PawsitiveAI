
"use client";
import { ClientAppLayout } from "./client-layout";
import { useEffect, useState } from "react";
import { useAuth } from "@/firebase/provider";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);


  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // Render the ClientAppLayout only on the client-side to avoid hydration mismatch
  return isClient ? <ClientAppLayout>{children}</ClientAppLayout> : null;
}
