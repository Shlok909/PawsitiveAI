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
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Edit, LogOut, Upload } from "lucide-react";

// Mock Data
const dogProfile = {
  name: "Buddy",
  breed: "Golden Retriever",
  age: 5,
  avatarUrl: PlaceHolderImages.find((img) => img.id === "dog-avatar")?.imageUrl || "https://picsum.photos/seed/1/100/100",
};

const user = {
    name: "Alex Doe",
    email: "alex.doe@example.com",
}

const usageStats = {
    analysesThisMonth: 12,
    totalAnalyses: 87,
    memberSince: "January 2024",
}

export default function ProfilePage() {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Profile & Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Your Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue={user.name} />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user.email} disabled />
                    </div>
                    <Button className="w-full">Update Account</Button>
                    <Separator />
                    <Button variant="outline" className="w-full">Change Password</Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Log Out</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive" className="w-full">
                        <LogOut className="mr-2 h-4 w-4" /> Log Out
                    </Button>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                <CardTitle className="text-xl">Dog Profile</CardTitle>
                <CardDescription>Manage your furry friend's details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Avatar className="h-24 w-24 border-4 border-background">
                                <AvatarImage src={dogProfile.avatarUrl} alt={dogProfile.name} data-ai-hint="golden retriever"/>
                                <AvatarFallback>{dogProfile.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <Button variant="outline" size="icon" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-card">
                                <Upload className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="grid flex-1 gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="dog-name">Name</Label>
                                    <Input id="dog-name" defaultValue={dogProfile.name} />
                                </div>
                                <div>
                                    <Label htmlFor="age">Age</Label>
                                    <Input id="age" type="number" defaultValue={dogProfile.age} />
                                </div>
                            </div>
                             <div>
                                <Label htmlFor="breed">Breed</Label>
                                <Input id="breed" defaultValue={dogProfile.breed} />
                            </div>
                        </div>
                    </div>
                    <Button className="w-full lg:w-auto">Save Changes</Button>
                </CardContent>
            </Card>
        
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="bg-muted p-4 rounded-lg">
                            <p className="text-3xl font-bold">{usageStats.analysesThisMonth}</p>
                            <p className="text-sm text-muted-foreground">Analyses this month</p>
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                            <p className="text-3xl font-bold">{usageStats.totalAnalyses}</p>
                            <p className="text-sm text-muted-foreground">Total analyses</p>
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                            <p className="text-xl font-bold">{usageStats.memberSince}</p>
                            <p className="text-sm text-muted-foreground">Member since</p>
                        </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
