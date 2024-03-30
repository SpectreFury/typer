import React from "react";
import PlayerItem from "./player-item";

const PLAYERS = [
  {
    name: "Guest",
    progress: 10,
  },
];

type ParagraphProps = {
  paragraph: string;
  input: string;
};

const Players = ({ paragraph, input }: ParagraphProps) => {
  return (
    <div className="w-full">
      {PLAYERS.map((player) => (
        <PlayerItem name={player.name} paragraph={paragraph} input={input} />
      ))}
    </div>
  );
};

export default Players;
