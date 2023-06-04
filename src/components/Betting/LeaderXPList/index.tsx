import React from "react";
import { LeaderItemType } from "../LeaderXPItem";

const LeaderXPList = (props: LeaderItemType) => {
  const walletAddre = `${props.wallet.slice(0, 6)}...${props.wallet.slice(-3)}`;

  return (
    <li className=" text-gray-200 text-[14px] font-500 border-b border-[#132236] py-[6px] px-[12px] flex gap-4 items-center mb-2">
      <div className="">#{props.no}</div>
      <div className="">
        <img
          src="/images/betting/avatars/general.png"
          alt="avatar"
          width={34}
          height={34}
          className="rounded-[10px] w-[34px] h-[34px]"
        />
      </div>
      <div className="">{walletAddre}</div>
      <div className="text-[16px] font-700">{props.totalXP}&nbsp;xp</div>
    </li>
  );
};

export default LeaderXPList;
