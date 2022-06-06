import React from "react";

import { Wrapper } from "./Wrapper";
import { Row } from "./Row";
import { orange, blue, green } from "./colors";

export const Theatre3 = ({ seats }) => {
  return (
    <Wrapper
      wrapperHeight={285}
      wrapperWidth={277}
      screenTopOffset={-100}
      screenLeftOffset={15}
    >
      <Row
        row={seats.A}
        color={orange}
        rowKey="A"
        startingOffset={32}
        topOffset={5}
      />
      <Row
        row={seats.B}
        color={orange}
        rowKey="B"
        startingOffset={16}
        topOffset={42}
      />
      <Row
        row={seats.C}
        color={blue}
        rowKey="C"
        startingOffset={0}
        topOffset={79}
      />
      <Row
        row={seats.D}
        color={blue}
        rowKey="D"
        startingOffset={16}
        topOffset={116}
      />
      <Row
        row={seats.E}
        color={blue}
        rowKey="E"
        startingOffset={0}
        topOffset={153}
      />
      <Row
        row={seats.F}
        color={blue}
        rowKey="F"
        startingOffset={16}
        topOffset={190}
      />
      <Row
        row={seats.G}
        color={green}
        rowKey="G"
        startingOffset={75}
        topOffset={227}
        jumps={[{ index: 0, distance: 22 }]}
      />
      <Row
        row={seats.H}
        color={green}
        rowKey="H"
        startingOffset={144}
        topOffset={264}
      />
    </Wrapper>
  );
};

// const serverData = {
//   name: "theatre3",
//   seats: {
//     A: [0, 0, 0, 0, 0, 0, 0],
//     B: [0, 0, 0, 1, 1, 1, 0, 0],
//     C: [0, 1, 1, 1, 0, 0, 0, 1, 1],
//     D: [0, 0, 1, 1, 0, 0, 0, 0],
//     E: [1, 1, 0, 0, 0, 0, 1, 1, 0],
//     F: [0, 0, 0, 0, 0, 0, 0, 0],
//     G: [0, 1, 1, 1, 0, 0],
//     H: [0, 0, 1, 1],
//   },
// };
