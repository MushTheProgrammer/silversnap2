
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Camera, Building, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: <Camera className="h-8 w-8 text-primary" />,
    title: "Portrait Photography",
    description: "Individual, couple, and family portraits that capture personality and connection.",
    image: "/img/mockserv/portrait.jpg",
    aiHint: "portrait photo"
  },
  {
    icon: <PartyPopper className="h-8 w-8 text-primary" />,
    title: "Event Coverage",
    description: "Comprehensive coverage for weddings, corporate events, and special occasions.",
    image: "/img/mockserv/event.jpg",
    aiHint: "wedding event"
  },
  {
    icon: <Building className="h-8 w-8 text-primary" />,
    title: "Commercial Shoots",
    description: "High-quality images for products, branding, and marketing campaigns.",
    image: "/img/mockserv/commercial.jpg",
    aiHint: "product photography"
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter font-headline">Our Services</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            We offer a range of professional photography services tailored to your needs.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className={cn(
              "reflection-effect flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 bg-card"
            )}>
                <div className="relative h-48 w-full">
                    <Image src={service.image} alt={service.title} data-ai-hint={service.aiHint} fill className="object-cover" />
                </div>
              <CardHeader className="flex-row items-center gap-4">
                {service.icon}
                <CardTitle className="font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
