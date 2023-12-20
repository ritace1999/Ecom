import { images } from "@/constants";
import Head from "next/head";
import Image from "next/image";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import ImageSlide from "./ImageSlider";

const HomeComponent = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {/* <div className="h-[100%] w-[100vw] bg-gray-500">
        <div className="h-[350px] w-full">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            navigation={true}
            loop={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            // autoplay={{
            //     delay: 2500,
            //     disableOnInteraction: false,
            // }}
            modules={[EffectCoverflow, Navigation, Autoplay]}
            className="swiper_container"
          >
            <SwiperSlide>
              <ImageSlide />
            </SwiperSlide>
            <SwiperSlide>
              <ImageSlide />
            </SwiperSlide>
            <SwiperSlide>
              <ImageSlide />
            </SwiperSlide>
            <SwiperSlide>
              <ImageSlide />
            </SwiperSlide>
            <SwiperSlide>
              <ImageSlide />
            </SwiperSlide>
            <SwiperSlide>
              <ImageSlide />
            </SwiperSlide>
          </Swiper>
        </div>
      </div> */}
    </>
  );
};

export default HomeComponent;
