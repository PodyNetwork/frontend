import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CarouselWidthContextType {
  carouselWidth: number;
  setCarouselWidth: (width: number) => void;
}

const CarouselWidthContext = createContext<CarouselWidthContextType | undefined>(undefined);

export const CarouselWidthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [carouselWidth, setCarouselWidth] = useState<number>(0);

  return (
    <CarouselWidthContext.Provider value={{ carouselWidth, setCarouselWidth }}>
      {children}
    </CarouselWidthContext.Provider>
  );
};

export const useCarouselWidth = () => {
  const context = useContext(CarouselWidthContext);
  if (context === undefined) {
    throw new Error('useCarouselWidth must be used within a CarouselWidthProvider');
  }
  return context;
};
