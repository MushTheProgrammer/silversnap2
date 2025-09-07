
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const categories = ["All", "Portraits", "Events", "Commercial"];

const allImages = [
  { src: "https://picsum.photos/600/400?random=10", category: "Portraits", alt: "Portrait 1", aiHint: "woman portrait" },
  { src: "https://picsum.photos/600/800?random=11", category: "Events", alt: "Event 1", aiHint: "crowd concert" },
  { src: "https://picsum.photos/800/600?random=12", category: "Commercial", alt: "Commercial 1", aiHint: "product display" },
  { src: "https://picsum.photos/600/400?random=13", category: "Portraits", alt: "Portrait 2", aiHint: "man portrait" },
  { src: "https://picsum.photos/800/600?random=14", category: "Events", alt: "Event 2", aiHint: "wedding reception" },
  { src: "https://picsum.photos/600/800?random=15", category: "Commercial", alt: "Commercial 2", aiHint: "city architecture" },
  { src: "https://picsum.photos/600/400?random=16", category: "Portraits", alt: "Portrait 3", aiHint: "child playing" },
  { src: "https://picsum.photos/600/800?random=17", category: "Events", alt: "Event 3", aiHint: "corporate meeting" },
  { src: "https://picsum.photos/800/600?random=18", category: "Commercial", alt: "Commercial 3", aiHint: "food photography" },
];

type ImageType = typeof allImages[0];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  const filteredImages = filter === "All"
    ? allImages
    : allImages.filter((image) => image.category === filter);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter font-headline">Gallery</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            A selection of our favorite shots.
          </p>
        </div>
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? 'default' : 'outline'}
              onClick={() => setFilter(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
        <Dialog>
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
            {filteredImages.map((image, idx) => (
              <DialogTrigger asChild key={`${image.src}-${idx}`} onClick={() => setSelectedImage(image)}>
                <div className="group relative mb-4 break-inside-avoid overflow-hidden rounded-lg cursor-pointer">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    data-ai-hint={image.aiHint}
                    width={600}
                    height={400}
                    className="object-cover w-full h-auto transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                </div>
              </DialogTrigger>
            ))}
          </div>
          <DialogContent className="max-w-4xl p-0 border-0">
            {selectedImage && (
              <Image
                src={selectedImage.src.replace(/(\d+)\/(\d+)/, '1200/800')}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="object-contain w-full h-auto rounded-lg"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
