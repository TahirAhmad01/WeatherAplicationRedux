import React from "react";

export default function Details({ title, children }) {
  return (
    <React.Fragment>
      <div className="mx-2 md:mx-4 my-3 text-center font-medium">
        <div>{title}</div>
        <div>{children}</div>
      </div>
    </React.Fragment>
  );
}
