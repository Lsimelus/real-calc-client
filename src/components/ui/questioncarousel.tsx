"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { type CarouselApi } from "@/components/ui/carousel";

interface QuestionCarouselProps {
  completedQuestions: boolean[];
  questionPages: React.ReactNode[];
}

export const QuestionCarousel: React.FC<QuestionCarouselProps> = ({
  completedQuestions,
  questionPages,
}: QuestionCarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel setApi={setApi} className="ml-20 mr-20 lg:col-span-3 col-span-5">
      <CarouselContent>
        {questionPages.map((question, index) => (
          <CarouselItem key={index}>
            <div className="p-1">{question}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext disabled={!completedQuestions[current - 1]} />
    </Carousel>
  );
};
