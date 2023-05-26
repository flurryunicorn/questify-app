import React from "react";
import { LeaderItemType } from "../../LeaderItem";

const LeaderListItem = (props: LeaderItemType) => {
  return (
    <li className=" text-gray-200 text-[14px] font-500 rounded-[5px] border border-[#787878] bg-[#272829] py-[6px] px-[12px] flex gap-8 items-center mb-2">
      <div className="">#{props.no}</div>
      <div className="">
        <img
          src={props.avatarUrl}
          alt="avatar"
          width={34}
          height={34}
          className="rounded-[10px] w-[34px] h-[34px]"
        />
      </div>
      <div className="">{props.name}</div>
      <div className="text-[16px] font-700">{props.score}</div>
    </li>
  );
};

export default LeaderListItem;
