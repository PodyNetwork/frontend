import React, { useEffect, useRef, useState } from 'react';
import ButtonIcon from '../../global/buttonIcon';
import services from '../data/services.json';

type Service = {
  title: string;
  icon: string;
  special: boolean;
};

const shuffleArray = (array: Service[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

const ScrollContent = () => {
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);
  const scrollRef3 = useRef<HTMLDivElement>(null);

  const [shuffledServices1, setShuffledServices1] = useState<Service[]>([]);
  const [shuffledServices2, setShuffledServices2] = useState<Service[]>([]);
  const [shuffledServices3, setShuffledServices3] = useState<Service[]>([]);

  useEffect(() => {
    setShuffledServices1(shuffleArray([...services]));
    setShuffledServices2(shuffleArray([...services]));
    setShuffledServices3(shuffleArray([...services]));
  }, []); // Only run once on client mount

  useEffect(() => {
    const scrollElements = [scrollRef1.current, scrollRef2.current, scrollRef3.current];

    const intervals = scrollElements.map((scrollElement, index) => {
      if (!scrollElement) return null;

      const handleScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = scrollElement;
        if (scrollLeft >= scrollWidth - clientWidth) {
          scrollElement.scrollLeft = 0;
        } else if (scrollLeft <= 0) {
          scrollElement.scrollLeft = scrollWidth - clientWidth; 
        }
      };

      return setInterval(() => {
        scrollElement.scrollLeft += index % 2 === 0 ? 0.5 : -0.5; 
        handleScroll();
      }, 25);
    });

    return () => intervals.forEach(interval => interval && clearInterval(interval));
  }, []);

  return (
    <div className='flex flex-col gap-y-4 mt-10 pb-8 text-xs'>
      <div className='flex flex-row gap-x-3 flex-nowrap overflow-hidden' ref={scrollRef1}>
        {shuffledServices1.map((servicedata, index) => (
          <ButtonIcon key={index} svg={servicedata.icon} special={servicedata.special}>
            {servicedata.title}
          </ButtonIcon>
        ))}
      </div>
      <div className='flex flex-row gap-x-3 flex-nowrap overflow-hidden' ref={scrollRef2}>
        {shuffledServices2.map((servicedata, index) => (
          <ButtonIcon key={index} svg={servicedata.icon} special={servicedata.special}>
            {servicedata.title}
          </ButtonIcon>
        ))}
      </div>
      <div className='flex flex-row gap-x-3 flex-nowrap overflow-hidden' ref={scrollRef3}>
        {shuffledServices3.map((servicedata, index) => (
          <ButtonIcon key={index} svg={servicedata.icon} special={servicedata.special}>
            {servicedata.title}
          </ButtonIcon>
        ))}
      </div>
    </div>
  );
};

export default ScrollContent;
