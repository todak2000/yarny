import { useRouter } from "next/router";
import React from "react";
const Hero: React.FC = () => {
  const { push } = useRouter();
  const handleLink = (link: string) => {
    push(link);
  };
  return (
    <div className=" flex w-full flex-col items-center md:items-start justify-center px-4 py-[40px]  md:px-[120px]">
      <div className="w-2/3 flex flex-col items-center sm:items-start">
      <p className="text-secondary text-center sm:text-left text-5xl font-bold font-primary">Decentralized Social Media Platform</p>
      
      <p className="text-lg my-5 text-center sm:text-left text-[#f8f8f8]">Join the revolution and take back control of your social media experience.</p>
      <button onClick={()=>handleLink('/auth/register')} className="bg-main hover:bg-white hover:text-main hover:border hover:border-1 hover:border-main px-10 py-4 my-3 text-white font-thin">Join the Revolution</button>
      </div>
    </div>
  );
};

export default React.memo(Hero);
