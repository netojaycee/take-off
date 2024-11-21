// components/ReusableCarousel.js

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CustomCarousel({
  items,
  renderCard,
  carouselOpts,
}: any) {
  return (
    // <Carousel opts={carouselOpts} className="w-full">
          <Carousel customControls={false} controlAlignment="center" opts={carouselOpts}>

      <CarouselContent className="-ml-1">
        {items && items.map((item: any, index: number) => (
          <CarouselItem
            key={index}
            className="pl-1 basis-1/3 lg:basis-1/4"
          >
            <div className="p-1">
              {renderCard(item)}{" "}
              {/* Pass the data to the card rendering function */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
