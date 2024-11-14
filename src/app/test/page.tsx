"use client";

import { useEffect, useState, useRef } from 'react';

function ResponsiveNav() {
  const [overflowItems, setOverflowItems] = useState<string[]>([]);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const nav = navRef.current;
      if (!nav) return;

      const children = Array.from(nav.children) as HTMLElement[];
      const overflow: string[] = [];

      // Reset display of all children
      children.forEach((child) => {
        if (child instanceof HTMLElement) {
          child.style.display = '';
        }
      });

      // Check for overflow and hide items starting from the right
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];
        if (nav.scrollWidth > nav.clientWidth) {
          if (child instanceof HTMLElement) {
            overflow.unshift(child.textContent || '');
            child.style.display = 'none';
          }
        }
      }

      setOverflowItems(overflow);
    };

    // Call handleResize on component mount and window resize
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log(overflowItems)

  return (
    <div className="nav-container">
      <div className="nav" ref={navRef}>
        <a href="#home">Home</a>
        <a href="#discover">Discover</a>
        <a href="#trending">Trending</a>
        <a href="#live">Live</a>
        <a href="#events">Events</a>
      </div>

      {overflowItems.length > 0 && (
        <div className="more-menu">
          <span>☰</span>
          <ul>
            {overflowItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResponsiveNav;
