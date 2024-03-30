"use client";

import React, { useState, useEffect } from "react";
const PARAGRAPH =
  "He sat staring at the person in the train stopped at the station going in the opposite direction. She sat staring ahead, never noticing that she was being watched. Both trains began to move and he knew that in another timeline or in another universe, they had been happy together.";
import { Input } from "@/components/ui/input";
import Players from "./_components/player";

const Room = () => {
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const [paragraph, setParagraph] = useState(PARAGRAPH);

  const paragraphList = paragraph.split("");
  const inputList = input.split("");

  const [incorrectIndexes, setIncorrectIndexes] = useState<number[]>([]);

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
      <Players paragraph={paragraph} input={input} />
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
