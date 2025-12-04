// src/components/homePage/HorizontalSlider.jsx


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Guide from "./guide";



 // use exact file name + extension
import guideImg from "../../assets/homepage/guide.jpg";
import girl from "../../assets/homepage/girl.png";
import man1 from "../../assets/homepage/man-1.jpg";
import man2 from "../../assets/homepage/man-2.jpg";
import man3 from "../../assets/homepage/man-3.jpg";
// <- your image

const guides = [
  { id: 1, img: guideImg, name: "Milindu Gomes" },
  { id: 2, img: girl, name: "Lihini Thennakoon" },
  { id: 3, img: man1, name: "Yasith Madusham" },
  { id: 4, img: man2, name: "Akila Niluksha" },
  { id: 5, img: man3, name: "Sangeeth Lakshan" },
  { id: 5, img: guideImg, name: "Anupa Supul" },
  { id: 5, img: girl, name: "Kavindu Lakshan" },
  { id: 5, img: man1, name: "Milindu Gomes" },
];

export default function HorizontalSlider() {
  return (
    <div className="w-full max-w-7xl py-8 px-2">
            <Swiper
        modules={[Autoplay, A11y]}
        
        spaceBetween={30}
        slidesPerView={1}
        navigation={true}
        loop={true}
        freeMode={false}
        mousewheel={{ forceToAxis: true }}
        // style={{ overflow: 'visible' }}
        keyboard={{ enabled: true }}
        breakpoints={{
         
        340: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // Medium screens (md: 768px)
        768: {
          slidesPerView: 3,
          spaceBetween: 25,
        },
        // Large screens (lg: 1024px)
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        }}

        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={1000}
        className="py-4"
      >
        {guides.map((g) => (
          <SwiperSlide key={g.id} className="px-3 flex justify-center">
            <div className="flex justify-center items-center">
              <Guide img={g.img} name={g.name} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
