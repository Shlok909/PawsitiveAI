import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PawsightLogo, DogTailAnimation } from "@/components/icons";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { DisclaimerFooter } from "@/components/disclaimer-footer";

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-dog");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <PawsightLogo className="h-8 w-8" />
          <span className="font-headline">Pawsight AI</span>
        </Link>
        <DogTailAnimation className="h-10 w-10 text-primary" />
      </header>
      <main className="flex-grow">
        <section className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 py-12 md:grid-cols-2 md:py-24">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Decode Your Dog's Silence.
            </h1>
            <p className="text-lg text-muted-foreground">
              Understand your furry friend like never before. Pawsight AI analyzes your dog's body language to reveal their emotions and well-being.
            </p>
            <Button asChild size="lg" className="shadow-lg">
              <Link href="/welcome">Get Started Free</Link>
            </Button>
          </div>
          <div className="relative h-64 w-full md:h-96">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                fill
                className="rounded-2xl object-cover shadow-2xl"
              />
            )}
          </div>
        </section>
      </main>
      <DisclaimerFooter />
    </div>
  );
}
