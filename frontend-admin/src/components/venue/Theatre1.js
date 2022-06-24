import React from "react";

import { Wrapper } from "./Wrapper";
import { Row } from "./Row";
import { orange, blue, green } from "./colors";

export const Theatre1 = ({ seats }) => {
  return (
    <Wrapper
      wrapperHeight={428}
      wrapperWidth={665}
      screenTopOffset={-100}
      screenLeftOffset={210}
    >
      <Row
        row={seats.A}
        rowKey="A"
        color={orange}
        jumps={[
          { index: 0, distance: 10 },
          { index: 7, distance: 24 },
          { index: 8, distance: 7 },
        ]}
        startingOffset={27}
      />
      <Row row={seats.B} color={orange} rowKey="B" topOffset={37} />
      <Row row={seats.C} color={orange} rowKey="C" topOffset={74} /> 
      <Row row={seats.D} color={orange} rowKey="D" topOffset={111} />
      <Row row={seats.E} color={blue} rowKey="E" topOffset={148} />
      <Row row={seats.F} color={blue} rowKey="F" topOffset={185} />
      <Row row={seats.G} color={blue} rowKey="G" topOffset={222} />
      <Row row={seats.H} color={blue} rowKey="H" topOffset={259} />
      <Row row={seats.J} color={green} rowKey="J" topOffset={296} />
      <Row
        row={seats.K}
        color={green}
        rowKey="K"
        topOffset={333}
        jumps={[{ index: 8, distance: 96 }]}
      />
      <Row
        row={seats.L}
        color={green}
        rowKey="L"
        topOffset={370}
        jumps={[{ index: 8, distance: 96 }]}
      />
      <Row
        row={seats.M}
        color={green}
        rowKey="M"
        topOffset={407}
        jumps={[
          { index: 1, distance: 15 },
          { index: 2, distance: 15 },
          { index: 3, distance: 15 },
          { index: 4, distance: 285 },
          { index: 6, distance: 32 },
        ]}
        startingOffset={-10}
      />
    </Wrapper>
  );
};
