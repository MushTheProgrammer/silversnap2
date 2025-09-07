"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
  className?: string;
  cursorClassName?: string;
}

export function Typewriter({
  text,
  speed = 100,
  delay = 2000,
  loop = false,
  className,
  cursorClassName,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    let mainTimeout: NodeJS.Timeout;

    const handleTyping = () => {
      if (loop) {
        if (!isDeleting && displayedText.length === text.length) {
          mainTimeout = setTimeout(() => setIsDeleting(true), delay);
        } else if (isDeleting && displayedText.length === 0) {
          setIsDeleting(false);
        }
      }

      if (isDeleting) {
        typingTimeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, speed / 2);
      } else {
        if (displayedText.length < text.length) {
          typingTimeout = setTimeout(() => {
            setDisplayedText((prev) => prev + text.charAt(displayedText.length));
          }, speed);
        }
      }
    };

    handleTyping();

    const cursorInterval = setInterval(() => {
      setCursorVisible((vis) => !vis);
    }, 500);

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(mainTimeout);
      clearInterval(cursorInterval);
    };
  }, [displayedText, isDeleting, text, speed, loop, delay]);
  
  useEffect(() => {
    setDisplayedText('');
    setIsDeleting(false);
  }, [text]);

  return (
    <span ref={containerRef} className={cn('relative', className)}>
      {displayedText}
      <span
        className={cn(
          'inline-block h-full w-[2px] bg-current align-bottom',
          cursorVisible ? 'opacity-100' : 'opacity-0',
          'transition-opacity duration-150 ml-1',
          cursorClassName
        )}
        style={{ animation: cursorVisible ? 'blink 1s infinite' : 'none' }}
      />
    </span>
  );
}
