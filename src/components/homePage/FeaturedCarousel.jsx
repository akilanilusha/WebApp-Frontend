// src/components/homePage/FeaturedCarousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow, A11y, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import guideImg from "../../assets/man-4.jpg";
import beach from "../../assets/homepage/Featured/bluebeach.jpg"
import ella from "../../assets/homepage/Featured/ella.jpg"
import galle from "../../assets/homepage/Featured/galle.png"
import m1 from "../../assets/homepage/Featured/m1.jpg"
import train from "../../assets/homepage/Featured/train.jpg"
import lipton from "../../assets/homepage/Featured/lipton.jpg"
import anu from "../../assets/homepage/Featured/anuradapura.jpg"

const items = [
  { id: 1, img: beach, name: "Blue Beach" },
  { id: 2, img: ella, name: "Ella" },
  { id: 3, img: galle, name: "Galle" },
  { id: 4, img: m1, name: "Kalpitiya" },
  { id: 5, img: train, name: "Wallawaya" },
  { id: 6, img: lipton, name: "Lipton" },
  { id: 7, img: anu, name: "Anuradhapura" },
  { id: 8, img: guideImg, name: "Ampara" },
];

export default function FeaturedCarousel() {
  return (
    <div className="w-full max-w-6xl mx-auto bg-primary">
      <Swiper
        modules={[Autoplay, EffectCoverflow, A11y]}
        effect="coverflow"
        centeredSlides={true}
        loop={true}
        freeMode={false}
        slidesPerView={1}
        navigation={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 160,
          modifier: 1,
          slideShadows: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 3},
          1024: { slidesPerView: 4},
        }}
        className="featured-carousel"
        // style={{ overflow: 'visible' }}
      >
        {items.map((it) => (
          <SwiperSlide
            key={it.id}
            className="flex justify-center transition-all duration-500 ease-out"
          >
            <div
              className="
                slide-card 
                relative 
                rounded-3xl 
                overflow-hidden 
                shadow-xl
                transition-all 
                duration-500 
                ease-out 
               
              "
            >
              {/* image */}
              <img
                src={it.img}
                alt=""
                className="w-[250px] h-[350px] md:w-[300px] md:h-[420px] object-cover "
              />

              {/* overlay text */}
              <div className="absolute bottom-5 left-5 text-white">
                <h2 className="text-2xl font-semibold drop-shadow-lg">
                  {it.name}
                </h2>
                <p className="opacity-90">25 Listings</p>
              </div>

              {/* button */}
              <button className="absolute bottom-5 right-30 sm:right-5 bg-white text-black px-4 py-2 rounded-full shadow-md text-sm hover:bg-gray-100 transition">
                View All →
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
