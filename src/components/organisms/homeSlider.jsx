import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { LandCard, ProductCard } from "../atoms";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

function HomeSlider(props) {
  const [swiper, setSwiper] = React.useState(null);

  const onNextSwiper = () => {
    swiper.slideNext();
  };
  const onBackSwiper = () => {
    swiper.slidePrev();
  };
  return (
    <div className="w-full lg:w-1/2 pb-6">
      <div className={`flex ${props.controller == "justify-start" ? "flex-row-reverse" : "flex-row"} mb-4 items-end`}>
        <div className={`font-poppinsSemibold text-2xl block lg:hidden ${props.controller == "justify-start" ? "text-end" : "text-start"}`}>
          {props.title?.map((val, i) => {
            return <span key={i}>{val}</span>;
          })}
        </div>
        <div className={`sm:flex hidden w-full ${props.controller}`}>
          <div className="space-x-2">
            <button className="bg-white border-2 hover:bg-gray-300 active:bg-gray-500 border-black rounded-full " onClick={() => onBackSwiper()}>
              <BiChevronLeft size={36} />
            </button>
            <button className="bg-white border-2 hover:bg-gray-300 active:bg-gray-500 border-black rounded-full " onClick={() => onNextSwiper()}>
              <BiChevronRight size={36} />
            </button>
          </div>
        </div>
      </div>
      <div className=" flex flex-row h-auto items-center">
        <Swiper
          slidesPerView={"auto"}
          breakpoints={{
            // when window width is >= 640px
            280: {
              slidesPerView: 1,
            },
            // when window width is >= 768px
            700: {
              slidesPerView: 2,
            },
            999: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 1,
            },
            1200: {
              slidesPerView: 2,
            },
          }}
          // spaceBetween={"auto"}
          centeredSlides={false}
          onSwiper={(s) => {
            setSwiper(s);
          }}
          loop={true}
          className="mySwiper w-full h-auto "
        >
          {props.data?.map((val, i) => {
            return (
              <SwiperSlide key={i} className="flex justify-center">
                {props.type == "urban" ? <LandCard key={i} data={val} /> : <ProductCard key={i} data={val} />}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className={`d-flex text-center`}>
        <button
          type={"button"}
          onClick={props.onClick}
          className={`w-11/12 mt-6 font-poppinsSemibold rounded-2xl mx-4 py-2 border-2 border-tandur text-tandur text-lg hover:text-tandur/70 hover:border-tandur/70 active:text-tandur/90 active:border-tandur/90 focus:outline-none disabled:text-tandur/70`}
        >
          Lihat Semua
        </button>
        {/* <CommonButton type="submit" customStyle={"m-0 mt-6 w-11/12 px-8 "} title="Lihat Semua" disabled={true} /> */}
      </div>
    </div>
  );
}

export default HomeSlider;
