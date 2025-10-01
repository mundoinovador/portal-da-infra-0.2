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
    <Carousel className="relative px-[4rem]">
      <CarouselContent className="flex bg-blue-400 w-full">
        <CarouselItem className="w-full">
          <div className="flex flex-col gap-4 items-center">
            <h2>Imagem</h2>
            <p>Aqui ficara imagens dos produtos</p>
            <img className="w-full" src="/assets/produto.jpeg" alt="" />
          </div>
        </CarouselItem>
        <CarouselItem>2</CarouselItem>
        <CarouselItem>3</CarouselItem>
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
