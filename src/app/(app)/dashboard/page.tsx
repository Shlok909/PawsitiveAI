
"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  Plus,
  FileText,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DogTailAnimation } from "@/components/icons";
import { useAuth } from "@/firebase/provider";

export default function DashboardPage() {
  const hasReports = false; // This would be dynamic based on user data
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.displayName?.split(' ')[0]}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your pup.</p>
        </div>
        <Button asChild>
          <Link href="/analyze">
            New Analysis <Plus className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
            <Avatar className="h-16 w-16 border-2 border-primary">
              {user?.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />}
              <AvatarFallback className="text-2xl bg-secondary">
                {user?.displayName?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user?.displayName}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full" asChild>
              <Link href="/profile">View Profile</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center justify-between">
              Last Analysis
              <FileText className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hasReports ? (
              <>
                <div className="text-3xl font-bold">Happy</div>
                <p className="text-sm text-muted-foreground">with 92% confidence</p>
              </>
            ) : (
               <div className="text-center text-muted-foreground pt-4">
                  <p>No analysis yet.</p>
                  <p className="text-xs">Run one to see results!</p>
               </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
             <CardTitle className="text-md font-medium flex items-center justify-between">
              Total Analyses
              <BarChart2 className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-3xl font-bold">{hasReports ? 1 : 0}</div>
             <p className="text-sm text-muted-foreground">reports generated</p>
          </CardContent>
        </Card>
      </div>
      
      {hasReports ? (
        <div>
          <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Recent Reports</h2>
              <Button variant="ghost" asChild>
                  <Link href="/history">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
          </div>
          {/* Add report list here when data is available */}
        </div>
      ) : (
        <Card className="text-center flex flex-col items-center justify-center p-8 lg:p-12 gap-4">
            <DogTailAnimation className="w-24 h-24 text-primary" />
            <h2 className="text-2xl font-bold mt-4">No Reports Yet!</h2>
            <p className="text-muted-foreground max-w-sm">
                It looks like you haven't analyzed your dog's behavior yet. Click the button below to get started and unlock insights into your furry friend's world.
            </p>
            <Button size="lg" className="mt-4" asChild>
                <Link href="/analyze">
                    <Sparkles className="mr-2 h-5 w-5" /> Start First Analysis
                </Link>
            </Button>
        </Card>
      )}
    </div>
  );
}
