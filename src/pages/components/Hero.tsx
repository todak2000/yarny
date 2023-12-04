import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
const Hero: React.FC = () => {
  const { push, pathname } = useRouter();
  const handleLink = (link: string) => {
    push(link);
  };
  return (
    <div className=" flex w-full flex-col items-center md:items-start justify-center px-4 py-[40px]  md:px-[120px]">
      <div className="w-2/3 flex flex-col items-center sm:items-start">
      <p className="text-secondary text-center sm:text-left text-3xl font-bold font-primary">Decentralized Social Media Platform</p>
      
      <p className="text-sm mt-3 text-center sm:text-left">Join the revolution and take back control of your social media experience.</p>
      <button onClick={()=>handleLink('/auth/register')} className="bg-main hover:bg-white hover:text-main hover:border hover:border-1 hover:border-main px-5 py-2 my-3 text-white font-thin">Join the Revolution</button>
      </div>
    </div>
  );
};

export default React.memo(Hero);
