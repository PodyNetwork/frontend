import React, { useEffect, useState } from "react";
import Marquee from "react-marquee-slider";
import ButtonIcon from "../../../global/buttonIcon";
import services from "../../data/services.json";

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
  const [shuffledServices1, setShuffledServices1] = useState<Service[]>([]);
  const [shuffledServices2, setShuffledServices2] = useState<Service[]>([]);
  const [shuffledServices3, setShuffledServices3] = useState<Service[]>([]);

  useEffect(() => {
    setShuffledServices1(shuffleArray([...services]));
    setShuffledServices2(shuffleArray([...services]));
    setShuffledServices3(shuffleArray([...services]));
  }, []);

  return (
    <div className="flex flex-col gap-y-4 text-xs">
      <div className="overflow-hidden">
        <Marquee
          velocity={10}
          resetAfterTries={200}
          direction="rtl"
          scatterRandomly={false}
          onInit={() => {}}
          onFinish={() => {}}
        >
          {shuffledServices1.map((servicedata, index) => (
            <div className="me-3"  key={index}>
              <ButtonIcon
                svg={servicedata.icon}
                special={servicedata.special}
              >
                {servicedata.title}
              </ButtonIcon>
            </div>
          ))}
        </Marquee>
      </div>
      <div className="overflow-hidden">
        <Marquee
          velocity={10}
          resetAfterTries={200}
          direction="ltr"
          scatterRandomly={false}
          onInit={() => {}}
          onFinish={() => {}}
        >
          {shuffledServices2.map((servicedata, index) => (
            <div className="me-3" key={index}>
              <ButtonIcon
                svg={servicedata.icon}
                special={servicedata.special}
              >
                {servicedata.title}
              </ButtonIcon>
            </div>
          ))}
        </Marquee>
      </div>
      <div className="overflow-hidden">
        <Marquee
          velocity={10}
          resetAfterTries={200}
          direction="rtl"
          scatterRandomly={false}
          onInit={() => {}}
          onFinish={() => {}}
        >
          {shuffledServices3.map((servicedata, index) => (
            <div className="me-3"  key={index}>
              <ButtonIcon
                svg={servicedata.icon}
                special={servicedata.special}
              >
                {servicedata.title}
              </ButtonIcon>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default ScrollContent;
