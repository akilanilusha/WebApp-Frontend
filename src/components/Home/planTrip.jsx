import React from "react";
import tripgenix from "../../assets/homepage/TRIPGENIX.png";

function PlanTrip() {
  return (
    <div className="container mx-auto px-4 mt-10">
      
      {/* Image Wrapper */}
      <div className="relative w-full rounded-xl overflow-hidden" data-aos="fade-down">
        {/* Image */}
        <img
          src={tripgenix}
          alt="Plan your trip"
          className="w-full  object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center ">
          <h2
            className="
              text-black
              text-lg md:text-5xl
              font-semibold text-center
            "
          >
            PLAN YOUR DREAM TRIP WITH <br />
            <span className="text-[#1DA9CC]">TRIPGENIX</span>
          </h2>
        </div>
      </div>

      {/* Cards Section */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">
            Make Your Path
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Plan your journey by selecting destinations and finding the
            best route with distance and time estimates.
          </p>
          <button className="bg-[#1DA9CC] hover:bg-[#1692b0] text-white px-5 py-2 rounded-md text-sm">
            Try Out
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">
            Choose Your Vehicle
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Select the perfect vehicle based on your group size,
            comfort, and travel route.
          </p>
          <button className="bg-[#1DA9CC] hover:bg-[#1692b0] text-white px-5 py-2 rounded-md text-sm">
            Get My Vehicle
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">
            Choose Your Tour Guide
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Pick an experienced local guide to make your journey
            more informative and enjoyable.
          </p>
          <button className="bg-[#1DA9CC] hover:bg-[#1692b0] text-white px-5 py-2 rounded-md text-sm">
            Find a Guide
          </button>
        </div>

      </div>
    </div>
  );
}

export default PlanTrip;
