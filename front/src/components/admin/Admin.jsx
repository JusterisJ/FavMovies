import React from "react";
import AddNewMovie from "./AddNewMovie";

export default function Admin() {
  return (
    <div className="container ">
      <div className="row text-center">
        <div className="col-6 offset-3">
          <AddNewMovie />
        </div>
      </div>
    </div>
  );
}
