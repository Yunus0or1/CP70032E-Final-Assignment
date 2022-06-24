import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSeat, removeSeat, selectSeats } from "../../state/bookSlice";

const seatSize = 22;

export const Seat = ({ rowKey, index, available, color }) => {
  const dispatch = useDispatch();
  const seats = useSelector(selectSeats);

  let selected = false;

  seats.forEach((e) => {
    if (e.rowKey === rowKey && e.index === index) selected = true;
  });

  const handleOnClick = () => {
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
        fontSize: 25,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: available ? "pointer" : "default",
      }}
    >
      {selected ? "✔️" : ""}
    </div>
  );
};
