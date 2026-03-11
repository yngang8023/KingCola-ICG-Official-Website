import React from "react";
import { EventsTop } from "../constants/Events";
import { Carousel } from "react-responsive-carousel";
import "./css/Carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const MyCarousel = () => {
  const slides = Array.isArray(EventsTop)
    ? EventsTop.filter((item) => item?.image)
    : [];

  if (!slides.length) {
    return <div className="programs-carousel-fallback" aria-hidden="true" />;
  }

  return (
    <Carousel
      className="programs-hero-carousel"
      showStatus={false}
      showThumbs={false}
      showIndicators={false}
      autoPlay
      infiniteLoop
      interval={6000}
      transitionTime={700}
      emulateTouch
      swipeable
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className="relative h-[560px] md:h-[620px] lg:h-[680px] bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default MyCarousel;
