import React from "react";

import { Seat } from "./Seat";

const multiplier = 32;

const occurrencesOf = (number, numbers) =>
  numbers.reduce(
    (counter, currentNumber) =>
      number === currentNumber ? counter + 1 : counter,
    0
  );

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
  const displayRow = row.filter((seat) => seat != 3);

  const apex = displayRow.length / 2 - 0.5;
  const curveOffsets = curve
    ? displayRow.map((_, index) => {
        const diff = Math.abs(apex - index);
        return diff ** 1.8;
      })
    : Array(displayRow.length).fill(0);

  const allIndexes = row.map((value, index) => {
    const occ = occurrencesOf(3, row.slice(0, index));
    return {
      value: value,
      actualIndex: index,
      fakeIndex: index - occ,
    };
  });

  const indexes = [];
  [...allIndexes].reverse().forEach((objA) => {
    let valueExists = false;
    indexes.forEach((objB) => {
      if (objB.fakeIndex == objA.fakeIndex) valueExists = true;
    });

    if (!valueExists) indexes.push(objA);
  });
  const finalIndexes = [...indexes].reverse();

  const calculatedRow = finalIndexes.map((obj) => {
    const { value, actualIndex, fakeIndex } = obj;
    const index = fakeIndex;

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
          actualIndex={actualIndex}
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
