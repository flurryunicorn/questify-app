import React from "react";

export interface QuestBorderMenuItemProps {
  name: string;
  active: boolean;
  type: string;
}

export default function QuestBorderMenuItem(props: QuestBorderMenuItemProps) {
  return (
    <div
      className={`flex justify-center items-center rounded-[40px] border-[1.2px] 
                  font-[500] xl:text-[14px] lg:text-[14px] md-text-[14px] text-[12px]
                  cursor-pointer ${
                    props.type == "large" ? "h-[48px]" : "h-[32px]"
                  } px-[13px] ${
        props.active
          ? "border-[#29B080] text-[#29B080] bg-[#162724]"
          : "border-[#272829] text-[#929298] bg-[#131314] hover:border-primary"
      } `}
    >
      <p className="whitespace-nowrap">{props.name}</p>
    </div>
  );
}
