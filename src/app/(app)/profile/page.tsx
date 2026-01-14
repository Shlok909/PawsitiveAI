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
import { Edit, LogOut } from "lucide-react";

// Mock Data
const dogProfile = {
  name: "Buddy",
  breed: "Golden Retriever",
  age: 5,
  avatarUrl: PlaceHolderImages.find((img) => img.id === "dog-avatar")?.imageUrl || "https://picsum.photos/seed/1/100/100",
};

const user = {
    email: "user@example.com",
}

const usageStats = {
    analysesThisMonth: 12,
    totalAnalyses: 87,
    memberSince: "January 2024",
}

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <h1 className="font-headline text-3xl font-bold">Profile & Settings</h1>

      <Card className="card-neumorphic">
        <CardHeader className="flex flex-col items-center text-center">
            <div className="relative">
                 <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                    <AvatarImage src={dogProfile.avatarUrl} alt={dogProfile.name} data-ai-hint="golden retriever"/>
                    <AvatarFallback>{dogProfile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="icon" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                    <Edit className="h-4 w-4" />
                </Button>
            </div>
          <CardTitle className="font-headline text-2xl mt-4">{dogProfile.name}</CardTitle>
          <CardDescription>{dogProfile.breed} • {dogProfile.age} years old</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={dogProfile.name} />
                </div>
                <div>
                    <Label htmlFor="breed">Breed</Label>
                    <Input id="breed" defaultValue={dogProfile.breed} disabled/>
                </div>
             </div>
             <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" defaultValue={dogProfile.age} />
             </div>
             <Button className="w-full">Save Changes</Button>
        </CardContent>
      </Card>
      
      <Card className="card-neumorphic">
          <CardHeader>
            <CardTitle className="font-headline">Usage Stats</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-2xl font-bold">{usageStats.analysesThisMonth}</p>
                    <p className="text-xs text-muted-foreground">This Month</p>
                </div>
                 <div>
                    <p className="text-2xl font-bold">{usageStats.totalAnalyses}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                </div>
                 <div>
                    <p className="text-lg font-bold">{usageStats.memberSince}</p>
                    <p className="text-xs text-muted-foreground">Member Since</p>
                </div>
          </CardContent>
      </Card>

      <Card className="card-neumorphic">
          <CardHeader>
            <CardTitle className="font-headline">Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email} disabled />
            </div>
            <Separator />
             <Button variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" /> Log Out
            </Button>
          </CardContent>
      </Card>
    </div>
  );
}
