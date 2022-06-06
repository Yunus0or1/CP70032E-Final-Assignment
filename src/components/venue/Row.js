import React from "react";

import { Seat } from "./Seat";

const multiplier = 32;

export const Row = ({
  row,
  rowKey,
  color = "black",
  topOffset = 0,
  jumps = [],
  startingOffset = 0,
  curve = false,
  lockedSeats = [],
}) => {
  const labelSeperation = 20;

  // removing "3" instances which mark row seperation
  row = row.filter((seat) => seat != 3);

  const apex = (row.length / 2) - 0.5;
  const curveOffsets = curve
    ? row.map((_, index) => {
        const diff = Math.abs(apex - index);
        return diff ** 1.8;
      })
    : Array(row.length).fill(0);

  const calculatedRow = row.map((value, index) => {
    // eslint-disable-next-line
    const available = value == "1" ? true : false;
    const locked = lockedSeats.includes(index);

    let left = startingOffset + index * multiplier;
    jumps.forEach((e) => (index > e.index ? (left += e.distance) : null));

    let top = topOffset;
    top -= curveOffsets[index];

    const seatWrapped = (
      <div
        style={{
          position: "absolute",
          top,
          left,
        }}
      >
        <Seat
          rowKey={rowKey}
          index={index}
          available={available && !locked}
          color={locked ? "" : color}
        />
        {row.length - 1 === index ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 10 + labelSeperation,
            }}
          >
            {rowKey}
          </div>
        ) : (
          <></>
        )}
      </div>
    );

    return seatWrapped;
  });

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: topOffset - curveOffsets[0],
          left: startingOffset - labelSeperation,
        }}
      >
        {rowKey}
      </div>
      {calculatedRow}
    </>
  );
};
