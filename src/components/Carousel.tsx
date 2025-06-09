import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from '@/components/ui/aspect-ratio';

export interface CarouselSlide {
  id: string | number;
  imageUrl?: string;
  altText?: string;
  content?: React.ReactNode; // For more complex slide content
  title?: string;
  subtitle?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoplayDelay?: number;
}

const Carousel: React.FC<CarouselProps> = ({ slides, autoplayDelay = 4000 }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: autoplayDelay })]);
  console.log("Rendering Carousel with", slides.length, "slides. Autoplay delay:", autoplayDelay);

  if (!slides || slides.length === 0) {
    return <div className="text-center py-4">No slides to display.</div>;
  }

  return (
    <div className="embla overflow-hidden rounded-lg shadow-lg" ref={emblaRef}>
      <div className="embla__container flex">
        {slides.map((slide) => (
          <div className="embla__slide flex-[0_0_100%] min-w-0" key={slide.id}>
            <AspectRatio ratio={16 / 9} className="bg-gray-100">
              {slide.imageUrl ? (
                <img
                  src={slide.imageUrl}
                  alt={slide.altText || slide.title || `Slide ${slide.id}`}
                  className="object-cover w-full h-full"
                />
              ) : (
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                    {slide.content || (
                      <>
                        {slide.title && <h3 className="text-2xl font-semibold mb-2">{slide.title}</h3>}
                        {slide.subtitle && <p className="text-gray-600">{slide.subtitle}</p>}
                      </>
                    )}
                  </CardContent>
                </Card>
              )}
            </AspectRatio>
             {/* Optional: Overlay text if imageUrl is present */}
             {slide.imageUrl && (slide.title || slide.subtitle) && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6 text-white">
                    {slide.title && <h3 className="text-xl md:text-3xl font-bold mb-1">{slide.title}</h3>}
                    {slide.subtitle && <p className="text-sm md:text-lg">{slide.subtitle}</p>}
                </div>
             )}
          </div>
        ))}
      </div>
      {/* Add Prev/Next buttons and Dots if needed for more complex carousels */}
    </div>
  );
};

export default Carousel;