import React from "react";
import Navbar from "@/components/navbar";

const RoomLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  );
};

export default RoomLayout;
