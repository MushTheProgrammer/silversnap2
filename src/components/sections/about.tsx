import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter font-headline">
              Our Story
            </h2>
            <p className="text-muted-foreground text-lg">
              SilverSnaps was born from a shared passion for visual storytelling. Our mission is to capture the essence of every moment, transforming fleeting instances into timeless art.
            </p>
            <p className="text-muted-foreground">
              With years of experience and a keen eye for detail, our approach combines technical precision with artistic intuition. We believe in creating a comfortable, collaborative atmosphere for our clients, ensuring that every photoshoot is a memorable experience.
            </p>
          </div>
          <div className="relative h-80 md:h-[500px] w-full">
              <Image
                src="/img/mockabt/about.jpg"
                alt="Photographer with camera"
                data-ai-hint="photographer camera"
                fill
                className="object-cover rounded-lg shadow-xl"
              />
          </div>
        </div>
      </div>
    </section>
  );
}
