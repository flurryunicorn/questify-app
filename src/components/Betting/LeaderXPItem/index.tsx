import React from "react";

export type LeaderItemType = {
  //   avatarUrl: string;
  //   no: number;
  //   type: boolean;
  //   name: string;
  //   score: number;
  avatarUrl: string;
  wallet: string;
  totalXP: string;
  no: number;
};

const LeaderXPItem = (props: LeaderItemType) => {
  const walletAddre = `${props.wallet.slice(0, 6)}...${props.wallet.slice(-3)}`;

  return (
    <div
      className={`${
        props.no % 2 == 0 ? "mt-[10px]" : "mt-[20px]"
      }  mx-1.5 rounded-md w-[103px] h-[104px] bg-cyan-400/10`}
    >
      <div className="rounded-full">
        <div className="flex justify-center mt-[-28px] mb-[6px]">
          <img
            src={`/images/betting/avatars/avatar${props.no}.png`}
            alt="avatar"
            width={56}
            height={56}
            className="rounded-full w-[56px] h-[56px]"
          />
        </div>
        <div className="text-[12px] text-emerald-200 font-500 flex justify-center">
          {walletAddre}
        </div>
        <div className="text-[14px]  text-gray-200 font-700 flex justify-center">
          {props.totalXP}
        </div>

        <div className="flex justify-center">
          <div
            className={`mt-[5px] text-emerald-300   text-[12px] rounded-[5px] px-8`}
          >
            {<span>#</span>}
            {props.no}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderXPItem;
