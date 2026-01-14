import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PawsightLogo } from "@/components/icons";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { DisclaimerFooter } from "@/components/disclaimer-footer";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-dog");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <PawsightLogo className="h-8 w-8" />
            <span className="text-2xl font-bold text-foreground">Pawsight AI</span>
          </Link>
          <Button asChild variant="ghost">
            <Link href="/welcome">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          <div className="order-2 space-y-6 text-center md:order-1 md:text-left">
            <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Decode Your Dog's Silence.
            </h1>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground md:mx-0">
              Understand your furry friend like never before. Pawsight AI analyzes your dog's body language to reveal their emotions and well-being.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg">
                <Link href="/welcome">Start for Free</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="rounded-full px-8 py-6 text-lg">
                <Link href="#">How it Works</Link>
              </Button>
            </div>
          </div>
          <div className="relative order-1 h-80 w-full md:order-2 md:h-[500px]">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                fill
                className="rounded-3xl object-cover shadow-2xl"
                priority
              />
            )}
          </div>
        </section>
      </main>

      <DisclaimerFooter />
    </div>
  );
}
