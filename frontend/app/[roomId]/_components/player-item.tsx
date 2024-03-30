import React, { useState, useEffect } from "react";
import { useSocket } from "@/components/providers/socket-provider";
import { Progress } from "@/components/ui/progress";

import { Player } from "../page";

type PlayerItemProps = {
  ourId?: string;
  paragraph: string;
  input: string;
  roomId?: string;
  player?: Player;
  isAuthor: boolean;
};

const PlayerItem = ({
  paragraph,
  input,
  ourId,
  roomId,
  player,
  isAuthor,
}: PlayerItemProps) => {
  const [progress, setProgress] = useState(0);
  const { socket } = useSocket();

  const getProgress = (paragraphLength: number, inputLength: number) => {
    return (inputLength / paragraphLength) * 100;
  };

  useEffect(() => {
    if (!socket) return;

    const timeoutId = setTimeout(() => {
      socket.emit("sending_progress", {
        roomId: roomId,
        id: ourId,
        progress,
      });
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [socket, progress]);

  useEffect(() => {
    const progress = getProgress(paragraph.length, input.length);
    console.log(progress);

    setProgress(progress);
  }, [input]);

  return (
    <div>
      <div>{isAuthor ? "Guest(You)" : player?.name}</div>
      <Progress value={isAuthor ? progress : player?.progress} />
    </div>
  );
};

export default PlayerItem;
