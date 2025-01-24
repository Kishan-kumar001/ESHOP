import React from "react";
import noDataImage from "../assets/nothing here yet.webp";

const NoData = () => {
  return (
    <div className="flex items-center justify-center flex-col p-4 gap-2">
      <img src={noDataImage} alt="No Data" className="w-36" />
      <p className="text-neutral-500">No Data</p>
    </div>
  );
};

export default NoData;
