/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "@/components/buttons/Button";
import { YarnyLogo } from "@/constant";
import { useDispatch, useSelector } from "react-redux";

import { setUser, clearUser } from "../../store";
import { MdCreate } from "react-icons/md";
import { auth } from "../../firebase";
import { GrPowerShutdown } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { handleSignOut } from "../api/firebase";
import Swal from "sweetalert2";

const Header: React.FC = () => {
  const { push, pathname } = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector((state: any) => state.user);

  const [showDropDown, setShowDropDown] = useState(false);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       const userData = {
  //         name: user.displayName,
  //         email: user.email,
  //         photo: user.photoURL,
  //         uid: user.uid,
  //       };
  //       dispatch(setUser(userData as any));
  //     } else {
  //       dispatch(clearUser());

  //     }
  //   });

  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, []);

  const handleClick = () => {
    setShowDropDown(!showDropDown);
  };
  const handleLink = (link: string) => {
    push(link);
  };

  const handleOut = () => {
    Swal.fire({
      title: "Are you sure you want to signout?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const out: any = await handleSignOut();
        if (out.statusCode === 200) {
          dispatch(clearUser());
          Swal.fire({
            title: "Success!",
            text: "Logout successfully!",
            icon: "success",
          });
        } else {
          Swal.fire("Oops an error occured", "", "info");
        }
      }
    });
  };

  return (
    <div className="bg-transparent  flex w-full flex-row items-center justify-between px-4 py-[40px]  md:px-[120px]">
      <div
        className="flex flex-shrink-0 cursor-pointer flex-row  items-center"
        onClick={() => handleLink("/")}
      >
        <Image src={YarnyLogo} alt="yarny logo" width={100} height={100} />
        
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
              }} className=" ml-3  flex cursor-pointer flex-row items-center text-xs text-black hover:font-bold hover:text-black md:mr-4 md:text-center">
              Login
            </p>
      </div>
    </div>
  );
};

export default React.memo(Header);
