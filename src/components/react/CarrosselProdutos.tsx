import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";

export function CarouselDemo() {
  return (
    <Carousel className="relative">
      <CarouselContent className="flex w-[100vw] h-[60vh]">
        <CarouselItem>
          <div className="bg-[url('/produtos/cadeiras/fixo/1/cadeira.jpeg')] bg-cover bg-center flex flex-col gap-4 justfy-center items-center w-full h-full"></div>
        </CarouselItem>

        <CarouselItem>
          <div className="bg-[url('/produtos/cadeiras/fixo/1/cadeira2.jpeg')] bg-cover bg-center flex flex-col gap-4 justfy-center items-center w-full h-full"></div>
        </CarouselItem>

        <CarouselItem>
          <div className="bg-[url('/produtos/cadeiras/fixo/1/cadeira3.jpeg')] bg-cover bg-center flex flex-col gap-4 justfy-center items-center w-full h-full"></div>
        </CarouselItem>
      </CarouselContent>
      {window.innerWidth >= 500 ? (
        <div>
          <CarouselPrevious className="absolute left-0" />
          <CarouselNext className="absolute right-4" />
        </div>
      ) : (
        <span></span>
      )}
    </Carousel>
  );
}
