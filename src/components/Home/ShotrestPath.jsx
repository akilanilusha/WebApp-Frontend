import React from "react";
import travel from "../../assets/homepage/TRAVEL.png";
import ShortestPathForm from "./ShortestPath/ShortestPathForm";
import map from "../../assets/homepage/map.jpg";

function ShotrestPath() {
  return (
    <div className="container mx-auto px-4 mt-20">
      {/* HERO */}
      <div
        className="relative w-11/12 md:w-8/12 
             h-[100px] md:h-[150px] lg:h-[200px]
             rounded-xl overflow-hidden flex justify-center mx-auto"
        data-aos="fade-up"
      >
        <img
          src={travel}
          alt="Plan your trip"
          className="w-full h-full object-container object-center"
        />

        <div className="absolute inset-0 flex items-center justify-center ">
          <h2 className="text-black text-xl sm:text-3xl md:text-5xl font-semibold text-center">
            MAKE YOUR
            <span className="text-[#1DA9CC]"> OWN PATH</span>
          </h2>
        </div>
      </div>
      {/* ROUTE SECTION */}
      <div
        className="mt-14 bg-cover bg-center rounded-3xl p-2 md:p-16"
        style={{ backgroundImage: `url(${map})` }}
      >
        <ShortestPathForm />
      </div>
    </div>
  );
}

export default ShotrestPath;
