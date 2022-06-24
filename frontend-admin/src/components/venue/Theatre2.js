import React from "react";

import { Wrapper } from "./Wrapper";
import { Row } from "./Row";
import { orange, blue, green } from "./colors";

export const Theatre2 = ({ seats }) => {
  const screenOffset = 33;

  return (
    <Wrapper
      wrapperHeight={348}
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
        topOffset={42 + screenOffset}
        curve={true}
      />
      <Row
        row={seats.C}
        color={orange}
        rowKey="C"
        startingOffset={64}
        topOffset={84 + screenOffset}
        curve={true}
      />
      <Row
        row={seats.D}
        color={blue}
        rowKey="D"
        startingOffset={32}
        topOffset={126 + screenOffset}
        curve={true}
      />
      <Row
        row={seats.E}
        color={blue}
        rowKey="E"
        startingOffset={32}
        topOffset={168 + screenOffset}
        curve={true}
      />
      <Row
        row={seats.F}
        color={blue}
        rowKey="F"
        topOffset={210 + screenOffset}
        curve={true}
      />
      <Row
        row={seats.G}
        color={green}
        rowKey="G"
        topOffset={252 + screenOffset}
        curve={true}
      />
      <Row
        row={[...seats.H, 0]}
        color={green}
        rowKey="H"
        topOffset={294 + screenOffset}
        curve={true}
        // would be minute one to identify last one but we are adding extra in row
        lockedSeats={[seats.H.length]}
      />
    </Wrapper>
  );
};
