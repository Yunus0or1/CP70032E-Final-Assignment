import React from "react";

import { Wrapper } from "./Wrapper";
import { Row } from "./Row";
import { orange, blue, green } from "./colors";

export const Theatre2 = ({ seats }) => {
  const screenOffset = 20;

  return (
    <Wrapper
      wrapperHeight={265}
      wrapperWidth={662}
      screenTopOffset={-100}
      screenLeftOffset={210}
    >
      <Row
        row={seats.A}
        color={orange}
        rowKey="A"
        startingOffset={96}
        topOffset={0 + screenOffset}
        curve={true}
      />
      <Row
        row={seats.B}
        color={orange}
        rowKey="B"
        startingOffset={64}
        topOffset={32 + screenOffset}
        curve={true}
      />
      <Row
        row={seats.C}
        color={orange}
        rowKey="C"
        startingOffset={64}
        topOffset={64 + screenOffset}
        curve={true}
      />
      <Row
        row={seats.D}
        color={blue}
        rowKey="D"
        startingOffset={32}
        topOffset={96 + screenOffset}
        curve={true}
      />
      <Row
        row={seats.E}
        color={blue}
        rowKey="E"
        startingOffset={32}
        topOffset={128 + screenOffset}
        curve={true}
      />
      <Row
        row={seats.F}
        color={blue}
        rowKey="F"
        topOffset={160 + screenOffset}
        curve={true}
      />
      <Row
        row={seats.G}
        color={green}
        rowKey="G"
        topOffset={192 + screenOffset}
        curve={true}
      />
      <Row
        row={seats.H}
        color={green}
        rowKey="H"
        topOffset={224 + screenOffset}
        curve={true}
        lockedSeats={[seats.H.length - 1]}
      />
    </Wrapper>
  );
};
