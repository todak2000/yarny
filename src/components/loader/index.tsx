import { ImSpinner2 } from "react-icons/im";
import React from "react";

const Loader: React.FC = () => {
  return (
    <ImSpinner2 className="animate-spin" />
  );
};

export default React.memo(Loader);
