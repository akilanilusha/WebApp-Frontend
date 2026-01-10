import React, { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const couponData = [
  { id: 1, discount: "5% off", title: "Hotels & Homes", icon: "🛏️" },
  { id: 2, discount: "5% off", title: "EU trains", icon: "🚆" },
  { id: 3, discount: "5% off", title: "Attractions & Tours", icon: "🎟️" },
  { id: 4, discount: "10% off", title: "Airport Transfers", icon: "✈️" },
  { id: 5, discount: "10% off", title: "Airport Transfers", icon: "✈️" },
];

export default function UserCoupon() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative px-6 py-6">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">New user exclusive</h2>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
             bg-white shadow-md rounded-full p-2"
      >
        <FiChevronLeft size={22} />
      </button>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {couponData.map((coupon) => (
          <div
            key={coupon.id}
            className="
              flex-shrink-0
              w-full md:w-[48%] lg:w-[23%]
              bg-white
              border border-pink-300 rounded-xl
              relative p-5
            "
          >
            {/* Dashed divider */}
            <div className="absolute right-14 top-0 h-full border-l border-dashed border-pink-300" />

            {/* Content */}
            <div className="flex justify-between h-full">
              {/* Left */}
              <div>
                <h3 className="text-lg font-bold">{coupon.discount}</h3>
                <p className="text-gray-700 mt-1">{coupon.title}</p>

                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700
                             text-white px-5 py-2 rounded-md text-sm"
                >
                  Claim All
                </button>
              </div>

              {/* Right Icon */}
              <div className="flex items-center text-3xl">{coupon.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}

      <button
        onClick={() => scroll("right")}
        className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
             bg-white shadow-md rounded-full p-2"
      >
        <FiChevronRight size={22} />
      </button>
    </div>
  );
}
