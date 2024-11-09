import React from "react";
import "./Home.css";
import MultiItemCarousel from "./MultiItemCarousel";

const Home = () => {
  return (
    <div>
      {/* Banner */}
      <section className="banner relative flex flex-col items-center justify-center">
        <div className="z-50 text-center fl select-none">
          <p className="text-6xl font-bold mb-3">Food Ordering</p>
          <p className="text-xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            <br />
            industry. Lorem Ipsum has been the industry standard
          </p>
        </div>

        {/* cover background */}
        <div className="absolute w-full h-[90vh] top-0 left-0 right-0 bg-[rgba(0,0,0,0.5)]"></div>

        {/* fadout */}
        <div className="absolute w-full bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[#0d0d0d] to-transparent"></div>
      </section>

      {/* Top Meals */}
      <section className="px-20 py-10">
        <MultiItemCarousel />
      </section>
    </div>
  );
};

export default Home;
