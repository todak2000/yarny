/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

import { HeroBg } from "@/constant";
const BgImage: React.FC = () => {
  const [imageWidth, setImageWidth] = React.useState<any>(1280);
  React.useEffect(() => {
    setImageWidth(window.innerWidth);
  }, []);

  return (
    <div className='bg-black flex flex-row justify-between items-center'>
      <div></div>
      <Image src={HeroBg} alt="yarny logo" width={imageWidth/2} className="xl:w-[680px] h-[100vh]" height={600} />
    </div>
  );
};

export default React.memo(BgImage);
