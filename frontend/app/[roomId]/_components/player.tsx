import React from "react";
import PlayerItem from "./player-item";

import { Player } from "../page";

type ParagraphProps = {
  ourId: string;
  paragraph: string;
  input: string;
  players: Player[];
  roomId: string;
};

const Players = ({
  paragraph,
  input,
  players,
  ourId,
  roomId,
}: ParagraphProps) => {
  return (
    <div className="w-full">
      <PlayerItem isAuthor={true} paragraph={paragraph} input={input} />
      {players.map((player) => (
        <PlayerItem
          key={player.id}
          paragraph={paragraph}
          input={input}
          ourId={ourId}
          roomId={roomId}
          player={player}
          isAuthor={false}
        />
      ))}
    </div>
  );
};

export default Players;
