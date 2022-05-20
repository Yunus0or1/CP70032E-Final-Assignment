import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectId } from "../state/authSlice";

export function Header() {
  const id = useSelector(selectId);
  const dispatch = useDispatch();

  return (
    <div style={{backgroundColor: "lightblue"}}>
      <p>reducer id: "{id}"</p>
      <button onClick={() => dispatch(login("okay"))}>login</button>
      <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  );
}
