"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowRight, PawPrint, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { PawsightLogo } from "@/components/icons";
import { DOG_BREEDS } from "@/lib/breeds";
import { Combobox } from "@/components/ui/combobox";

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  breed: z.string({ required_error: "Please select a breed." }),
  age: z.array(z.number()).min(1).max(1),
  photo: z.any().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const breedOptions = DOG_BREEDS.map(breed => ({ label: breed, value: breed }));

export default function WelcomePage() {
  const router = useRouter();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      age: [3],
    },
  });

  function onSubmit(data: ProfileFormValues) {
    console.log("Profile submitted:", data);
    router.push("/dashboard");
  }
  
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPhotoPreview(URL.createObjectURL(file));
      form.setValue("photo", file);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
            <PawsightLogo className="h-12 w-12 text-primary" />
            <h1 className="text-3xl font-bold">Create Your Dog's Profile</h1>
            <p className="text-muted-foreground">This helps us personalize the insights for you.</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                            <label htmlFor="photo-upload" className="cursor-pointer">
                                <div className="w-28 h-28 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-border overflow-hidden group">
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Dog preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center text-muted-foreground">
                                        <Upload className="w-8 h-8 mx-auto" />
                                        <span className="text-xs">Upload Photo</span>
                                    </div>
                                )}
                                </div>
                            </label>
                            <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                        </div>
                    </div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dog's Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Buddy" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="breed"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Breed</FormLabel>
                        <Combobox
                          options={breedOptions}
                          value={field.value}
                          onChange={(value) => form.setValue("breed", value)}
                          placeholder="Select a breed"
                          searchPlaceholder="Search breeds..."
                          emptyMessage="No breeds found."
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age: {field.value?.[0] ?? 0} years</FormLabel>
                        <FormControl>
                          <Slider
                            min={0}
                            max={25}
                            step={1}
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full rounded-full" size="lg">
              Create Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
