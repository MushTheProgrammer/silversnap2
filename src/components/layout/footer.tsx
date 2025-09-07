"use client";

import { useEffect, useState } from 'react';
import Logo from '@/components/icons/logo';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-border mt-20">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">SilverSnaps</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {currentYear && <>© {currentYear} SilverSnaps. All rights reserved.</>}
          </p>
        </div>
      </div>
    </footer>
  );
}
