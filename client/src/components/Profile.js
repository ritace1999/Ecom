import React, { useState } from "react";
import { images } from "@/constants";
import Image from "next/image";

import { HiOutlineCamera } from "react-icons/hi2";
import Form from "./Form";

const Profile = () => {
  const [hover, setHover] = useState(false);

  const handleHoverEnter = () => {
    setHover(true);
  };

  const handleHoverLeave = () => {
    setHover(false);
  };

  return (
    <div className="h-full w-full bg-gray-300 ">
      <div className="bg-gray-400 h-[200px]">
        <Image
          src={images.Sunny}
          alt="Background"
          className="h-full w-full object-fill"
        />
      </div>
      <div
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
        className="flex justify-center relative"
      >
        <Image
          src={images.Profile}
          alt="profile"
          className=" h-[120px] w-[120px] rounded-full border-white border-4 absolute top-[-60px]"
        />
        {hover && (
          <div className="h-[120px] w-[120px] flex justify-center bg-gray-50 bg-opacity-30 rounded-full border-white border-4 absolute top-[-60px] ">
            <HiOutlineCamera className="w-10 text-slate-800 h-auto text-primary" />
          </div>
        )}
      </div>
      <Form />
    </div>
  );
};

export default Profile;
