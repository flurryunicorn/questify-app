import React from "react";

import { minifyString } from "../../../utils";
import { PrimaryButton } from "../../../components/Common/Buttons";

export type QuestBoxType = {
  index?: number;
  active?: boolean;
  title: any;
  subTitle: any;
  description: string;
  avatar: string;
  isAvatar?: boolean;
  icon: string;
  amount: number;
  thumbnail: string;
  onClick?: Function;
  buttonCaption?: string;
};

const QuestBox = (props: QuestBoxType) => {
  return (
    <div
      className={`w-[200px] col-span-1 rounded-[20px] bg-[#030A13] ${
        props.active ? "border-2 border-[#6C9C6E]" : ""
      }`}
      key={props.index}
    >
      <div className="relative">
        <img
          src={props.thumbnail}
          className="rounded-[20px]"
          width={200}
          height={90}
          alt="thumbnail"
        />
        <div className="absolute top-[50px] bottom-0 left-0 right-0 rounded-[10px] linearGradient"></div>
        <div className="absolute left-[12px] bottom-[4px] right-[12px] h-[38px] flex ">
          {!props.isAvatar ? (
            <img
              src={props.avatar}
              className="border-[3px] h-[32px] border-globalBgColor rounded-[12px]"
              width={32}
              height={32}
              alt={"avatar"}
            />
          ) : (
            <div></div>
          )}
          <div className="text-white text-[16px] flex items-center pl-2">
            {props.title}
          </div>
        </div>
      </div>
      <div className="px-[20px] py-[8px] mb-2 flex flex-col justify-end">
        <div className="text-[#F3F3F3] text-[14px] mb-4">
          {props.subTitle}:&nbsp;
          <span className="text-[#929298]">
            {minifyString(props.description, 25)}
          </span>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2">
            <img
              src={props.icon}
              className="h-[16px] rounded-full"
              alt="icon"
              width={16}
              height={16}
            />
            <div className="text-[#F3F3F3] text-[18px]">{props.amount}</div>
          </div>
          <div className="w-[60px]">
            <PrimaryButton
              caption={props.buttonCaption || "Play"}
              onClick={props.onClick}
              styles="!h-[32px] !rounded-[10px] !py-[8px] !text-[14px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestBox;
