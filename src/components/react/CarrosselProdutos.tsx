import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";

interface CarouselDemoProps {
  listaImg: string[];
}

export function CarouselDemo({ listaImg }: CarouselDemoProps) {
  console.log(listaImg);
  return (
    <Carousel className="relative">
      <CarouselContent className="flex w-full">
        {listaImg.map((item, index) => (
          <CarouselItem key={index} className="flex justify-center w-full">
            <div
              className="flex flex-col gap-4 justify-center items-center w-full h-[60vh] bg-contain bg-no-repeat bg-center rounded-2xl"
              style={{ backgroundImage: `url('${item}')` }}
            ></div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Botões aparecem apenas em telas médias pra cima */}
      <CarouselPrevious className="hidden sm:flex absolute left-0" />
      <CarouselNext className="hidden sm:flex absolute right-4" />
    </Carousel>
  );
}
