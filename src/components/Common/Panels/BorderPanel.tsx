import React from "react";

type BorderPanelType = {
  children: any;
  style?: string;
  className?: string;
};

const BorderPanel = (props: BorderPanelType) => {
  return (
    <div
      className={`w-full mt-4 border-[#132236] bg-[#071018] rounded-2xl border-[2px]
      ${props.style ? props.style : ""}
      ${props.className ? props.className : ""}`}
    >
      {props.children}
    </div>
  );
};

export default BorderPanel;
