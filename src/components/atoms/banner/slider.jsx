import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper";

const Slider = ({ slides }) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      centeredSlides={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper w-full h-72 "
      loop={true}
    >
      {slides?.map((val, i) => {
        return (
          <SwiperSlide key={i}>
            <img src={val.image} className="object-fill  w-full h-full" alt=""></img>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
