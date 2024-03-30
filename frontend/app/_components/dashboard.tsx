import React from "react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="container flex flex-col items-center mt-20 gap-2">
      <div className="text-3xl font-medium">Join a room or invite a friend</div>
      <div className="flex gap-2">
        <Button>Play Now</Button>
        <Button variant="outline">Create a Lobby</Button>
      </div>
    </div>
  );
};

export default Dashboard;
