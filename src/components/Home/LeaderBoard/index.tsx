import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { minifyAddress } from "../../../utils";
import myImage from "./../../../../public/tetris.png";

export interface LeaderBoardProps {
  simple: boolean;
  level: number;
}

function calculateInterval(updatedTime) {
  const now = new Date();
  const updatedTime1 = new Date(updatedTime);
  // Calculate the difference in milliseconds
  const diffMs = now.getTime() - updatedTime1.getTime();

  // Convert milliseconds to days, hours, minutes, and seconds
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  // Format the result as a string
  const beforeTime = `${diffDays === 0 ? "" : diffDays + "d,"} ${
    diffHours === 0 ? "" : diffHours + "h,"
  }  ${diffMinutes === 0 ? "" : diffMinutes + "m,"}  ${
    diffSeconds === 0 ? "" : diffSeconds + "s"
  } `;

  return beforeTime;
}

const LeaderBoard = (props: LeaderBoardProps) => {
  const { winners } = useSelector((state: any) => ({
    winners: state.tetris.winners,
  }));

  const [sortedWinners, setSortedWinners] = useState<any>([]);

  useEffect(() => {
    let tempWinners = Object.assign({ ...winners });
    if (
      Object.keys(tempWinners) &&
      Object.keys(tempWinners).indexOf("showInfo") > -1 &&
      tempWinners.showInfo.length > 0
    ) {
      tempWinners = [...tempWinners.showInfo].sort(
        (a, b) => b.totalScore - a.totalScore
      );

      const sorted = tempWinners.map((winner, idx) => {
        let rankRange = 0;
        if (idx / tempWinners.length < 0.1) {
          rankRange = 10;
        } else if (idx / tempWinners.length < 0.3) {
          rankRange = 30;
        } else if (idx / tempWinners.length < 0.5) {
          rankRange = 50;
        }
        return { ...winner, rank: idx + 1, rankRange };
      });
      setSortedWinners(sorted);
    }
  }, [winners]);

  return props.simple ? (
    <div className="grid grid-row">
      {sortedWinners
        // .filter((player) => {
        //   return player.level === props.level;
        // })
        .map((winner, index) => (
          <div
            key={index}
            className="flex gap-8 cursor-pointer py-[20px]  text-gray-200 text-[14px] px-[30px] bg-black border border-[white]"
          >
            {/* <div className="">{new Date(winner.updatedAt).toLocaleTimeString('en-US', { hour12: false })} {new Date(winner.updatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</div>  */}
            <div className="">{minifyAddress(winner.wallet)}</div>
            <div className="">{winner.totalScore} P</div>
            {/* <div className="">{winner.totalBalance} Sei</div> */}
            <div className="">Ranked #{winner.rank}</div>
            {/* <div className=""> Top {winner.rankRange==='extra'?'extra':winner.rankRange+'%'} </div>
        <div className=""> <img src={myImage} alt="Tetris" style={{ width: '100px', height: '100px' }}/> </div>
        <div className="">{calculateInterval(winner.updatedAt)} ago</div>
         */}
          </div>
        ))}
    </div>
  ) : (
    <div className="grid grid-row">
      {sortedWinners
        // .filter((player) => {
        //   return player.level === props.level;
        // })
        .map((winner, index) => (
          <div
            key={index}
            className="flex gap-8 cursor-pointer py-[20px]  text-gray-200 text-[14px] px-[30px] bg-black border border-[white] items-center justify-between"
          >
            {/* <div className="w-[18%]">
              {new Date(winner.updatedAt).toLocaleTimeString("en-US", {
                hour12: false,
              })}{" "}
              {new Date(winner.updatedAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div> */}
            <div className="w-[12%]">{minifyAddress(winner.wallet)}</div>
            <div className="w-[10%]">{winner.totalScore} P</div>
            <div className="w-[10%]">
              {Math.floor(winner.totalBalance * 1000) / 1000} Sei
            </div>
            <div className="w-[10%]">Ranked #{winner.rank}</div>
            <div className="w-[10%]">
              {" "}
              {winner.rankRange === 0
                ? "extra"
                : "Top " + winner.rankRange + "%"}{" "}
            </div>
            <div className="w-[25px] h-[25px]">
              {" "}
              <img src={myImage} alt="Tetris" />{" "}
            </div>
            {/* <div className="w-[18%]">
              {calculateInterval(winner.updatedAt)} ago
            </div> */}
          </div>
        ))}
    </div>
  );
};

export default LeaderBoard;
