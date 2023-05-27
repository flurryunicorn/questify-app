import React from "react";

type BorderPanelType = {
  children: any;
  style?: string;
};

const BorderPanel = (props: BorderPanelType) => {
  return (
    <div
      className={`w-full mt-4 border-[#132236] border bg-[#071018] rounded-lg ${
        props.style ? props.style : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default BorderPanel;
