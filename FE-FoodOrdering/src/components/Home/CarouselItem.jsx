import React from "react";

const CarouselItem = ({ image, title }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        className="w-[8rem] h-[8rem] md:w-[10rem] md:h-[10rem] lg:w-[12rem] lg:h-[12rem] rounded-full object-cover object-center"
        src={image}
        alt={image}
      />
      <p className="text-center text-xl text-gray-300 font-semibold mt-2">
        {title}
      </p>
    </div>
  );
};

export default CarouselItem;
