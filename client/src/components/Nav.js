import Image from "next/image";
import React, { useState } from "react";
import { images } from "@/constants";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { IoBagHandle } from "react-icons/io5";

import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleProfileClick = () => {
    setIsHovered(!isHovered);
  };

  const handleEditProfile = () => {
    // Add logic to navigate to the edit profile page
    console.log("Editing profile...");
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
  };

  return (
    <div className="flex justify-between bg-black h-[70px] w-full px-8 text-white items-center">
      <div className="h-full w-[110px] flex justify-center cursor-pointer">
        <Image
          onClick={() => router.push("/")}
          src={images.Logo}
          alt="Logo"
          className="filter grayscale invert object-contain"
        />
      </div>
      <div className="flex gap-[50px] justify-center items-center">
        <div className="flex justify-between items-center w-[1000px] ml-[160px] ">
          <div className="w-[80%] flex justify-center items-center">
            <div className="rounded-l-md border-solid h-[35px] w-[30px] border-2 bg-black z-[1] flex justify-center items-center">
              <BsSearch className="text-xl text-white  p-1  cursor-pointer  " />
            </div>
            <input
              type="text"
              placeholder="Search Products"
              className="w-[100%] p-1 text-black rounded-l-none rounded-md focus:outline-none shadow-md border-solid border-2"
            />
          </div>

          <div className="flex justify-center items-center relative">
            <div className="flex justify-center items-center gap-[20px]">
              <Link href={"/cart"} className="">
                <IoBagHandle className="text-2xl" />
              </Link>
              <Link href={"/cart"} className="">
                <FiShoppingCart className="text-2xl" />
              </Link>
            </div>
            <div className="bg-white absolute ml-[52px]  top-[-16px] h-[20px] w-[20px] text-center flex justify-center items-center rounded-full ">
              <span className=" text-black font-semibold">1</span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="cursor-pointer" onClick={handleProfileClick}>
          <Image
            src={images.Profile}
            alt="profile"
            className="h-[50px] w-[50px] rounded-[100%] transition-transform transform hover:scale-110 hover:"
          />
        </div>
        {isHovered && (
          <div className=" w-[100px] text-center flex flex-col gap-2 absolute -mx-[24px] top-14 bg-black text-white shadow-md rounded-md  my-2 ">
            <Link href="/profile" className="">
              <p
                onClick={handleEditProfile}
                className="hover:bg-white hover:rounded-t-md hover:text-black"
              >
                Account
              </p>
            </Link>
            <Link href={"/login"}>
              <p
                className="cursor-pointer hover:bg-white hover:rounded-b-md hover:text-black"
                onClick={handleLogout}
              >
                Logout
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
