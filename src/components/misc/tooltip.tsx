import { PropsWithChildren, useEffect, useRef, useState } from 'react';

interface TooltipProps {
    text: string;
}

export const Tooltip = ({ children, text }: PropsWithChildren<TooltipProps>) => {
    const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
    const tooltipRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updatePosition = () => {
            if (!tooltipRef.current || !containerRef.current) return;
            
            const tooltip = tooltipRef.current.getBoundingClientRect();
            const viewport = {
                top: 0,
                right: window.innerWidth,
                bottom: window.innerHeight,
                left: 0,
            };

            // Check if tooltip goes beyond viewport boundaries
            if (tooltip.top < viewport.top) {
                setPosition('bottom');
            } else if (tooltip.bottom > viewport.bottom) {
                setPosition('top');
            } else if (tooltip.left < viewport.left) {
                setPosition('right');
            } else if (tooltip.right > viewport.right) {
                setPosition('left');
            }
        };

        window.addEventListener('resize', updatePosition);
        updatePosition();

        return () => window.removeEventListener('resize', updatePosition);
    }, []);

    const tooltipClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    const arrowClasses = {
        top: `before:top-full before:left-1/2 before:-translate-x-1/2 before:border-t-slate-800`,
        bottom: `before:bottom-full before:left-1/2 before:-translate-x-1/2 before:border-b-slate-800`,
        left: `before:left-full before:top-1/2 before:-translate-y-1/2 before:border-l-slate-800`,
        right: `before:right-full before:top-1/2 before:-translate-y-1/2 before:border-r-slate-800`,
    };

    return (
        <div className="group relative z-40" ref={containerRef}>
            <div
                ref={tooltipRef}
                className={`absolute ${tooltipClasses[position]} px-3 py-1 bg-slate-700 text-white text-[0.62rem] rounded-md 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap 
                    before:content-[''] before:absolute
                    before:border-4 before:border-transparent ${arrowClasses[position]}`}
            >
                {text}
            </div>
            {children}
        </div>
    );
};