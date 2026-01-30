import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Card1 from "./Card1";
// images (use your own paths - keep exact filenames + extensions)
import guideImg from "../../assets/homepage/hero.jpg";
import articles from "../../assets/homepage/articles.jpg";
import anu from "../../assets/homepage/Featured/anuradapura.jpg";

const guides = [
  { id: 1, img: articles, name: "Milindu Gomes" },
  { id: 2, img: articles, name: "Milindu Gomes" },
  { id: 3, img: articles, name: "Milindu Gomes" },
  { id: 4, img: articles, name: "Milindu Gomes" },
  { id: 5, img: articles, name: "Milindu Gomes" },
  { id: 6, img: articles, name: "Milindu Gomes" },
  { id: 7, img: articles, name: "Milindu Gomes" },
  { id: 8, img: articles, name: "Milindu Gomes" },
  { id: 9, img: articles, name: "Milindu Gomes" },
];

export default function CurveSlider() {
  return (
    <section className="relative container mx-auto overflow-hidden bg-transparent">

      {/* LEFT FADE */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 
                      bg-gradient-to-r from-white to-transparent z-10"></div>

      {/* RIGHT FADE */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 
                      bg-gradient-to-l from-white to-transparent z-10"></div>

      <Swiper
        modules={[Autoplay, A11y, Navigation]}
        spaceBetween={20}
        centeredSlides={true}
        slidesPerView="auto"
        navigation={false}
        loop={true}
        keyboard={{ enabled: true }}
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={600}
        className="py-4"
      >
        {guides.map((g) => (
          <SwiperSlide
            key={g.id}
            className="px-4 flex justify-center w-64 md:w-72 lg:w-80"
          >
            <div className="flex justify-center items-center bg-transparent">
              <Card1 img={g.img} name={g.name} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
