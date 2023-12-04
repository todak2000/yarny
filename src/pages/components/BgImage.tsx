import React from "react";

import { HeroBg } from "@/constant";
import Image from "next/image";
const BgImage: React.FC = () => {
  const [imageWidth, setImageWidth] = React.useState<any>(1280);
  React.useEffect(() => {
    setImageWidth(window.innerWidth);
  }, []);

  return (
    <div>
      <Image src={HeroBg} alt="yarny logo" width={imageWidth} className="xl:w-[1380px]" height={400} />
    </div>
  );
};

export default React.memo(BgImage);
