"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Players from "./_components/player";

import { useSocket } from "@/components/providers/socket-provider";
import { useParams } from "next/navigation";

export type Player = {
  name: string;
  id: string;
  progress: number;
};

const Room = () => {
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const [paragraph, setParagraph] = useState("");

  const [ourId, setOurId] = useState("");

  const { socket } = useSocket();

  const params = useParams();

  const paragraphList = paragraph.split("");
  const inputList = input.split("");

  const [incorrectIndexes, setIncorrectIndexes] = useState<number[]>([]);

  const [players, setPlayers] = useState<Player[]>([]);

  const verifyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      !isCorrect &&
      e.target.value.length > input.length &&
      e.target.value.length !== 1
    )
      return;

    setInput(e.target.value);
  };

  useEffect(() => {
    const fetchParagraph = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/${params.roomId}`
      );

      const result = await response.json();

      console.log(result);
      setParagraph(result.paragraph);
    };

    fetchParagraph();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.emit("join_room", {
      roomId: params.roomId,
    });

    socket.on("sending_our_id", (id) => {
      setOurId(id);
    });

    socket.on("player_joined", (id) => {
      console.log(`${id} has joined the room`);

      socket.emit("sending_back_details", {
        roomId: params.roomId,
        id: socket.id,
      });

      setPlayers((prev) => {
        const duplicatePlayer = prev.find((player) => player.id === id);
        if (duplicatePlayer) return prev;

        return [
          ...prev,
          {
            id: id,
            name: "Guest",
            progress: 0,
          },
        ];
      });
    });

    socket.on("receive_details", (id) => {
      console.log("Receving the details: ", id);

      setPlayers((prev) => {
        const duplicatePlayer = prev.find((player) => player.id === id);
        if (duplicatePlayer) return prev;

        return [
          ...prev,
          {
            id: id,
            name: "Guest",
            progress: 0,
          },
        ];
      });
    });

    socket.on("receiving_progress", (progressData) => {
      console.log("Receiving remote progress");

      console.log("Available players", players);
      console.log("Received player: ", progressData);

      setPlayers((prev) =>
        prev.map((player) => {
          if (player.id === progressData.id) {
            return {
              id: player.id,
              name: player.name,
              progress: progressData.progress,
            };
          }
          return player;
        })
      );
    });
  }, [socket]);

  useEffect(() => {
    inputList.forEach((letter, index) => {
      if (letter !== paragraphList[index]) {
        setIsCorrect(false);
        setIncorrectIndexes((prev) => [...prev, index]);
      } else {
        setIsCorrect(true);
        if (incorrectIndexes.includes(index)) {
          setIncorrectIndexes((prev) => prev.filter((idx) => idx !== index));
        }
      }
    });
  }, [input]);

  return (
    <div className="container flex flex-col items-center mt-10">
      <Players
        paragraph={paragraph}
        input={input}
        players={players}
        ourId={ourId}
        roomId={params.roomId as string}
      />
      <div className="text-lg max-w-[800px] mt-10">
        {paragraphList.map((letter, index) => (
          <span
            key={index}
            className={`${incorrectIndexes.includes(index) && "text-red-500"}`}
          >
            {letter}
          </span>
        ))}
      </div>
      <Input className="max-w-[800px]" value={input} onChange={verifyInput} />{" "}
      <div>{isCorrect ? "Yes" : "No"}</div>
    </div>
  );
};

export default Room;
