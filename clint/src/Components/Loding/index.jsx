import React from "react";
import { HashLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <HashLoader size={100} speedMultiplier={2} />
    </div>
  );
}
