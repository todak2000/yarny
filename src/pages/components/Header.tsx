/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import { useRouter } from "next/router";
import React, {useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";

import { YarnyLogo } from "@/constant";


const Header: React.FC = () => {
  const { push } = useRouter();
  const user = useSelector((state: any) => state.user);

  const [showDropDown, setShowDropDown] = useState(false);

  const handleClick = () => {
    setShowDropDown(!showDropDown);
  };
  const handleLink = (link: string) => {
    push(link);
  };

  return (
    <div className="bg-transparent  flex w-full flex-row items-center justify-between px-4 py-[40px]  md:pl-[120px] md:pr-4">
      <div
        className="flex flex-shrink-0 cursor-pointer flex-row  items-center"
        onClick={() => handleLink("/")}
      >
        <Image src={YarnyLogo} alt="yarny logo" width={30} height={30} />
        
      </div>
      <RxHamburgerMenu
        className="flex text-lg text-green-900 md:hidden"
        onClick={handleClick}
      />

<div
        className={` ${
          showDropDown
            ? "absolute top-16 right-4 grid w-[120px] grid-cols-1 gap-4 bg-white py-4 drop-shadow-md "
            : "hidden flex-row items-center md:flex"
        }`}
      >
        <p onClick={() => {
                handleLink("/auth/login");
              }} className=" ml-3  flex cursor-pointer flex-row items-center text-lg text-white hover:font-bold hover:text-main md:mr-4 md:text-center">
              Login
            </p>
      </div>
    </div>
  );
};

export default React.memo(Header);
