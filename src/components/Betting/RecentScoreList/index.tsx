import React from "react";
import { LeaderItemType } from "../LeaderItem";

export type DetailedLeaderItemType = {
  amount: number;
  createdAt: string;
  goal: number;
  id: string;
  level: number;
  score: number;
  updatedAt: string;
  wallet: string;
  avatarUrl: string;
};

let currentTime = new Date();
// let timeDiff = targetTime.getTime() - currentTime.getTime();

const RecentScoreList = (props: DetailedLeaderItemType) => {
  const walletAddre = `${props.wallet.slice(0, 6)}...${props.wallet.slice(-3)}`;
  const isSmallDevice = window.matchMedia("(max-width: 600px)").matches;

  function formatDateTime(dateString) {
    const date = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedDate = `${("0" + date.getUTCHours()).slice(-2)}:${(
      "0" + date.getUTCMinutes()
    ).slice(-2)} ${date.getUTCDate()} ${months[date.getUTCMonth()]}`;
    return formattedDate;
  }

  function getTimeInterval(dateString) {
    const targetDate = new Date(dateString);
    const currentDate = new Date();

    const intervalMs = currentDate.getTime() - targetDate.getTime();
    const intervalSec = Math.floor(intervalMs / 1000);

    return intervalSec;
  }

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  return (
    <li
      className=" text-gray-200 font-500 border-[#132236] border-b lg:text-[14px] text-[12px] 
      py-[6px] px-[10px] lg:pl-[40px] pl-[20px] pr-0 flex items-center mb-2 gap-4 overflow-scroll"
    >
      {!isSmallDevice && (
        <div className="w-[20%] m1-0">{formatDateTime(props.createdAt)}</div>
      )}
      {/* <div className="w-[20%]">{formatDateTime(props.createdAt)}</div> */}

      <div className="w-[25%] justify-center">
        {/* {walletAddre} */}
        {walletAddre}
      </div>
      {!isSmallDevice && (
        <div className="w-[10%] justify-center">
          <div className="w-[34px]">
            <img
              src="/images/betting/beppleee.png"
              alt="avatar"
              width={34}
              height={34}
              className="rounded-[10px] w-[34px] h-[34px]"
            />
          </div>
        </div>
      )}
      <div className="w-[10%] justify-center">{props.score}</div>

      <div className="font-700 w-[15%] justify-center">
        {props.amount}
        <span> SEI</span>
      </div>

      <div className="w-[10%] justify-center">
        <div className="w-[34px]">
          <img
            src="/images/betting/tile.svg"
            alt="avatar"
            width={34}
            height={34}
            className="rounded-[10px] w-[34px] h-[34px]"
          />
        </div>
      </div>

      <div className="w-[10%] font-700 justify-center">
        {formatTime(getTimeInterval(props.updatedAt))}
        <span className="text-[#9E9E9E]"> Ago</span>
      </div>
    </li>
  );
};

export default RecentScoreList;
