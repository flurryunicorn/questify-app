import React from "react";
import { LeaderItemType } from "../LeaderItem";

const LeaderSubList = (props: LeaderItemType) => {
  return (
    <li className=" text-gray-200 text-[14px] font-500 rounded-[5px] border border-[#787878] bg-[#272829] py-[6px] px-[12px] grid grid-cols-12 gap-4 items-center mb-2">
      <div className="col-span-5 flex gap-5 justify-end items-center">
        <div className="">{props.name}</div>
        <div className="">
          <img
            src={props.avatarUrl}
            alt="avatar"
            width={34}
            height={34}
            className="rounded-[10px] w-[34px] h-[34px]"
          />
        </div>
      </div>
      <div className="col-span-2 flex justify-center">3:0</div>
      <div className="col-span-5 flex gap-5 justify-start items-center">
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
      </div>
    </li>
  );
};

export default LeaderSubList;
