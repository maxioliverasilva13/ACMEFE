"use client";

import React, { useEffect, useState } from "react";

function PageHome() {
  const [text, setText] = React.useState("asd");

  useEffect(() => {
    setText("ola1")
  }, [])

  return (
    <div className="nc-PageHome relative overflow-hidden">
      <button onClick={() => setText("asd1")}>Change some</button>
    </div>
  );
}

export default PageHome;
