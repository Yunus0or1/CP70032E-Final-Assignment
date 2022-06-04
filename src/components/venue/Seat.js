import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSeat,
  removeSeat,
  selectSeatList,
} from "../../state/bookClientSlice";

const seatSize = 22;

export const Seat = ({ rowKey, index, available, color }) => {
  const dispatch = useDispatch();
  const seats = useSelector(selectSeatList);

  let selected = false;

  seats.forEach((e) => {
    if (e.rowKey === rowKey && e.index === index) selected = true;
  });

  const handleOnClick = () => {
    console.warn("available:" + available);
    console.warn(rowKey, index);

    if (available)
      selected
        ? dispatch(removeSeat({ rowKey, index }))
        : dispatch(addSeat({ rowKey, index }));
  };

  return (
    <div
      onClick={handleOnClick}
      style={{
        borderRadius: seatSize,
        height: seatSize,
        width: seatSize,
        opacity: available ? "1.0" : "0.17",
        backgroundColor: color,
        color: "black",
        fontSize: selected ? 25 : 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: available ? "pointer" : "default",
      }}
    >
      {available ? (selected ? "✔️" : rowKey + (index + 1)) : ""}
    </div>
  );
};
