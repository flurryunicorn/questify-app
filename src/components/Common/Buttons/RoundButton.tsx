import React from "react";

type RoundButtonProps = {
  caption: string;
  onClick?: Function;
  styles?: string;
};

const RoundButton = (props: RoundButtonProps) => {
  return (
    <div
      className={`border border-[#393939] bg-[#131314] py-[1px] px-4 rounded-full text-[14px]  text-gray-200 ${props.styles}`}
      onClick={() => props.onClick}
    >
      {props.caption}
    </div>
  );
};

export default RoundButton;
