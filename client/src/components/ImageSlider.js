import { images } from "@/constants";
import Image from "next/image";
import React from "react";
import { SwiperSlide } from "swiper/react";

const ImageSlide = ({ image }) => {
  return (
    <div className="imageSlider">
      <Image
        src={images.OpBook}
        alt="featured"
        className="h-full w-full object-contain"
      />
    </div>
  );
};

export default ImageSlide;
