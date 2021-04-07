import React from "react";
import { DotLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="loading d-flex justify-content-center align-items-center">
      <DotLoader size={80} />
    </div>
  );
};

export default Loading;
