'use client';

import React, { useEffect, useState } from "react";

function PageHome() {
  const [text, setText] = useState("asd1");
  console.log("renderizo")

  useEffect(() => {
    setText("ola1")
  }, [])

  return (
    <div className="nc-PageHome relative overflow-hidden">
      <button onClick={() => setText("asd1")}>{text} algo</button>
    </div>
  );
}

export default PageHome;
