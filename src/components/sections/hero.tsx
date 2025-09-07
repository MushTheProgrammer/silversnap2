import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { Typewriter } from '@/components/ui/typewriter';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full hero-bleed">
        <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover">
            <source src="video/bg-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-sm" />
      </div>
      
      <div className="relative z-10 container px-4 sm:px-6 lg:px-8 text-white">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 font-headline">
            <Typewriter text="Capturing Moments, Creating Art" loop={true} />
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/80 mb-8">
            We are a team of passionate photographers dedicated to preserving your most precious memories with creativity and professionalism.
        </p>
        <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="#gallery">View Our Work</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <Link href="#contact">Contact</Link>
            </Button>
        </div>
        <div className="absolute bottom-[-8vh] sm:bottom-[-12vh] left-1/2 -translate-x-1/2">
            <Link href="#about" aria-label="Scroll to about section">
                <ArrowDown className="h-8 w-8 text-white/70 animate-bounce" />
            </Link>
        </div>
      </div>
    </section>
  );
}
