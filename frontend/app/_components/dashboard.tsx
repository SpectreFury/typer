"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { useSocket } from "@/components/providers/socket-provider";

const Dashboard = () => {
  const router = useRouter();

  const { socket } = useSocket();

  const joinRoom = async () => {
    if (!socket?.id) return;

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: socket.id,
      }),
    });

    const result = await response.json();
    router.push(`/${result.id}`);
  };

  return (
    <div className="container flex flex-col items-center mt-20 gap-2">
      <div className="text-3xl font-medium">Join a room or invite a friend</div>
      <div className="flex gap-2">
        <Button onClick={joinRoom}>Play Now</Button>
        <Button variant="outline">Create a Lobby</Button>
      </div>
    </div>
  );
};

export default Dashboard;
