
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/firebase/provider";
import { signOut } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { LogOut, Upload, User, BarChart, Calendar, Bone } from "lucide-react";

const usageStats = {
    analysesThisMonth: 0,
    totalAnalyses: 0,
    memberSince: "July 2024",
}

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/signin');
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile & Settings</h1>
        <p className="text-muted-foreground">Manage your account information.</p>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <User className="h-6 w-6 text-primary" />
                    <CardTitle className="text-xl">Account Information</CardTitle>
                  </div>
                  <CardDescription>This is your personal information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                                {user?.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'user'} />}
                                <AvatarFallback className="text-4xl">{user?.displayName?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <Button variant="outline" size="icon" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-card shadow-md">
                                <Upload className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="grid flex-1 gap-4">
                            <div>
                                <Label htmlFor="user-name">Name</Label>
                                <Input id="user-name" defaultValue={user?.displayName || ''} />
                            </div>
                             <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" defaultValue={user?.email || ''} disabled />
                            </div>
                        </div>
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1 space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 bg-muted p-3 rounded-lg">
                           <div className="p-2 bg-background rounded-md">
                            <BarChart className="w-6 h-6 text-primary"/>
                           </div>
                           <div>
                            <p className="text-2xl font-bold">{usageStats.analysesThisMonth}</p>
                            <p className="text-sm text-muted-foreground">Analyses this month</p>
                           </div>
                        </div>
                         <div className="flex items-center gap-4 bg-muted p-3 rounded-lg">
                           <div className="p-2 bg-background rounded-md">
                            <Bone className="w-6 h-6 text-primary"/>
                           </div>
                           <div>
                            <p className="text-2xl font-bold">{usageStats.totalAnalyses}</p>
                            <p className="text-sm text-muted-foreground">Total analyses</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4 bg-muted p-3 rounded-lg">
                           <div className="p-2 bg-background rounded-md">
                            <Calendar className="w-6 h-6 text-primary"/>
                           </div>
                           <div>
                            <p className="text-lg font-bold">{usageStats.memberSince}</p>
                            <p className="text-sm text-muted-foreground">PawsitiveAI member since</p>
                           </div>
                        </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Log Out</CardTitle>
                    <CardDescription>End your current session.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive" className="w-full" onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" /> Log Out
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
