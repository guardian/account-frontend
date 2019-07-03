import React, { FC } from "react";

interface LinesProps {
  n: number;
}

export const Lines: FC<LinesProps> = props => {
  const { n } = props;
  const thickness = 1;
  const distance = 4;
  const height = n * distance;
  return (
    <>
      <hr
        css={{
          backgroundImage: `repeating-linear-gradient(to bottom, #dcdcdc, #dcdcdc ${thickness}px, transparent ${thickness}px, transparent ${distance}px)`,
          backgroundRepeat: "repeat",
          backgroundPosition: "top",
          height: `${height}px`,
          border: 0,
          margin: "0.75rem auto 0.375rem"
        }}
      />
    </>
  );
};