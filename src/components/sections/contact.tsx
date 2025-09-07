
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

// Form Schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

const locations = [
    {
        name: "Colombo - Head Office",
        address: "1490/16, Athapaththu Waththa Road, Hokandara, Pannipitiya",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.914831633101!2d79.95255237482813!3d6.899659993101083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25a2468494953%3A0x6a6036856755ac89!2s1490%2F16%20Athapaththu%20Waththa%20Rd%2C%20Hokandara!5e0!3m2!1sen!2slk!4v1725714777226!5m2!1sen!2slk"
    },
    {
        name: "Anuradhapura - Branch",
        address: "641/26B, Airport Road, Anuradhapura",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.288286289914!2d80.40716837484439!3d8.372551991666838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcf17999815091%3A0x5e412257d181515!2s641%2F26B%20Airport%20Rd%2C%20Anuradhapura!5e0!3m2!1sen!2slk!4v1725714881181!5m2!1sen!2slk"
    }
]

export default function Contact() {
  const { toast } = useToast();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [activeLocation, setActiveLocation] = useState(locations[0]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onFormSubmit(values: z.infer<typeof formSchema>) {
    setIsFormSubmitting(true);
    // Simulate API call and saving
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    form.reset();
    setIsFormSubmitting(false);
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter font-headline">Contact Us</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Have a question or want to book a session? Fill out the form below or visit us at one of our locations.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <div className="flex flex-col gap-8">
             <Card>
                <CardHeader>
                <CardTitle className="font-headline">Get in Touch</CardTitle>
                <CardDescription>We'd love to hear from you.</CardDescription>
                </CardHeader>
                <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" placeholder="your@email.com" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl><Textarea placeholder="Tell us about your project..." {...field} rows={5} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <Button type="submit" className="w-full" disabled={isFormSubmitting}>
                        {isFormSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Send Message
                    </Button>
                    </form>
                </Form>
                </CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold font-headline">Our Locations</h3>
                </div>
                <div className="flex gap-2">
                    {locations.map((location) => (
                        <Button
                            key={location.name}
                            variant={activeLocation.name === location.name ? 'default' : 'outline'}
                            onClick={() => setActiveLocation(location)}
                        >
                            {location.name}
                        </Button>
                    ))}
                </div>
                <p className="text-muted-foreground">{activeLocation.address}</p>
                 <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    <a href="tel:+94774271422" className="text-muted-foreground hover:text-primary transition-colors">+94 774271422</a>
                </div>
            </div>
            <div className="aspect-video w-full">
                <iframe
                    src={activeLocation.mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg shadow-xl"
                ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
