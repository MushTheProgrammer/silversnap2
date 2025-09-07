import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';
import SmokeCursor from '@/components/effects/smoke-cursor';

export const metadata: Metadata = {
  title: 'SilverSnaps',
  description: 'Capturing moments, creating art.',
  icons: null
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
      <SmokeCursor />
        {children}
        <Toaster />
        <Script
          id="block-inspect"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Disable right-click
              document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
              });
              // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
              document.addEventListener('keydown', function(e) {
                if (
                  e.key === 'F12' ||
                  (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
                  (e.ctrlKey && e.key === 'U')
                ) {
                  e.preventDefault();
                }
              });
            `,
          }}
        />
        <Script
          id="zapier-chatbot-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const script = document.createElement('script');
                script.src = 'https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js';
                script.async = true;
                script.type = 'module';
                
                script.onload = () => {
                  const chatbot = document.createElement('zapier-interfaces-chatbot-embed');
                  chatbot.setAttribute('is-popup', 'true');
                  chatbot.setAttribute('chatbot-id', 'cmf9vjjzy003olam2z77vm465');
                  document.body.appendChild(chatbot);
                };
                document.body.appendChild(script);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
