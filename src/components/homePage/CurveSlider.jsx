import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Card1 from "./Card1"; // adjust path if your Guide file is elsewhere

// images (use your own paths - keep exact filenames + extensions)
import guideImg from "../../assets/homepage/hero.jpg";
import articles from "../../assets/homepage/articles.jpg"
import anu from "../../assets/homepage/Featured/anuradapura.jpg"


const guides = [
  { id: 1, img: articles, name: "Milindu Gomes" },
  { id: 2, img: articles, name: "Milindu Gomes" },
  { id: 3, img: articles, name: "Milindu Gomes" },
  { id: 4, img: articles, name: "Milindu Gomes" },
  { id: 5, img: articles, name: "Milindu Gomes" },
  { id: 6, img: articles, name: "Milindu Gomes" },
  
  
];

export default function CurveSlider() {
  return (
    <section className="w-full max-w-6xl mx-auto py-8 px-2 overflow-visible bg-transparent">
      <Swiper
        modules={[Autoplay, A11y, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={"auto"}
        navigation={false}
        loop={true}
        keyboard={{ enabled: true }}
        // style={{ overflow: 'visible' }}
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
            {/* slide-card is targeted by Tailwind @layer styles */}
            <div className="flex justify-center items-center slide-card">
              <Card1 img={g.img} name={g.name} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
