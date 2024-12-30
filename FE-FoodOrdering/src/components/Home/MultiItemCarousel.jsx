import React from "react";
import { topMeal } from "./topMeal";
import CarouselItem from "./CarouselItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MultiItemCarousel = () => {
  const topMealDatas = topMeal();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-gray-400 mb-10">Top Meals</h2>
      <Slider {...settings}>
        {topMealDatas.map((item) => {
          return <CarouselItem image={item.image} title={item.title} />;
        })}
      </Slider>
    </div>
  );
};

export default MultiItemCarousel;
