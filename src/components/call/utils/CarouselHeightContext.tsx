import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CarouselHeightContextType {
  carouselHeight: number;
  setCarouselHeight: (height: number) => void;
}

const CarouselHeightContext = createContext<CarouselHeightContextType | undefined>(undefined);

export const CarouselHeightProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [carouselHeight, setCarouselHeight] = useState<number>(0);

  return (
    <CarouselHeightContext.Provider value={{ carouselHeight, setCarouselHeight }}>
      {children}
    </CarouselHeightContext.Provider>
  );
};

export const useCarouselHeight = () => {
  const context = useContext(CarouselHeightContext);
  if (context === undefined) {
    throw new Error('useCarouselHeight must be used within a CarouselHeightProvider');
  }
  return context;
};
