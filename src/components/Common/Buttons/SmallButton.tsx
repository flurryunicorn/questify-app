import React from "react";
import "font-awesome/css/font-awesome.min.css";

export interface ButtonProps {
  caption: string;
  icon?: string;
  bordered?: boolean;
  styles?: string;
  onClick: any;
}

const SmallButton = (props: ButtonProps) => {
  return (
    <div className="text-right">
      {" "}
      {/* Add a container div with the "text-right" class */}
      <button
        className={`text-[18px] border text-[#132236] font-bold bg-emerald-400 border-[#132236] shadow-xl
        py-2 px-5 rounded-lg hover:scale-105  duration-500 mb-[15px] inline-flex items-center
        hover:opacity-80 ${props.styles}`}
        onClick={props.onClick}
      >
        {props.icon ? props.icon : ""}
        <span>{props.caption}</span>
      </button>
    </div>
  );
};

export default SmallButton;
