/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";

import { MobileHeroBg } from "@/constant";

const BgImageMobile: React.FC = () => {
  const [imageWidth, setImageWidth] = React.useState<any>(780);
  React.useEffect(() => {
    setImageWidth(window.innerWidth);
  }, []);
  return (
    <div>
      <Image src={MobileHeroBg} alt="yarny logo" className="" width={imageWidth} height={400} />
    </div>
  );
};

export default React.memo(BgImageMobile);
