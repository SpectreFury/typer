import React, { useState, useEffect } from "react";

import { Progress } from "@/components/ui/progress";

type PlayerItemProps = {
  name: string;
  paragraph: string;
  input: string;
};

const PlayerItem = ({ name, paragraph, input }: PlayerItemProps) => {
  const [progress, setProgress] = useState(0);

  const getProgress = (paragraphLength: number, inputLength: number) => {
    return (inputLength / paragraphLength) * 100;
  };

  useEffect(() => {
    const progress = getProgress(paragraph.length, input.length);
    console.log(progress);

    setProgress(progress);
  }, [input]);

  return (
    <div>
      <div>{name}</div>
      <Progress value={progress} />
    </div>
  );
};

export default PlayerItem;
