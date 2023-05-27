import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { minifyAddress } from "../../../utils";

export interface LeaderBoardProps {
  simple: boolean;
  level: number;
}

function calculateInterval(updatedTime) {
  const now = new Date();
  const updatedTime1 = new Date(updatedTime);
  // Calculate the difference in milliseconds
  const diffMs = now.getTime() - updatedTime1.getTime();
  console.log(diffMs);

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

const RecentScore = (props: LeaderBoardProps) => {
  const { winners } = useSelector((state: any) => ({
    winners: state.tetris.winners,
  }));

  const [sortedWinners, setSortedWinners] = useState<any>([]);

  useEffect(() => {
    let tempWinners = { ...winners };
    if (
      Object.keys(tempWinners) &&
      Object.keys(tempWinners).indexOf("tetrisInfo") > -1 &&
      tempWinners.tetrisInfo.length > 0
    ) {
      console.log(new Date(tempWinners.tetrisInfo[0].updatedAt).getTime());
      let temp = [...tempWinners.tetrisInfo].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      // const sorted = tempWinners.map((winner, idx) => {
      //   let rankRange = 0;
      //   if (idx / tempWinners.length < 0.1) {
      //     rankRange = 10;
      //   } else if (idx / tempWinners.length < 0.3) {
      //     rankRange = 30;
      //   } else if (idx / tempWinners.length < 0.5) {
      //     rankRange = 50;
      //   }
      //   return { ...winner, rank: idx + 1, rankRange };
      // });
      // console.log(sorted);
      setSortedWinners(temp);
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
            className="flex gap-8 cursor-pointer py-[20px]  text-gray-200 text-[14px] px-[30px] bg-black border border-[white] justify-between items-center"
          >
            {/* <div className="">{new Date(winner.updatedAt).toLocaleTimeString('en-US', { hour12: false })} {new Date(winner.updatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</div>  */}
            <div className="w-[30%]">{minifyAddress(winner.wallet)}</div>
            <div className="w-[20%]">{winner.score}</div>
            <div className="w-[10%]">
              {winner.score > winner.goal ? "W" : "L"}
            </div>
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
            <div className="w-[18%]">
              {new Date(winner.updatedAt).toLocaleTimeString("en-US", {
                hour12: false,
              })}{" "}
              {new Date(winner.updatedAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="w-[12%]">{minifyAddress(winner.wallet)}</div>
            <div className="w-[10%]">{winner.score} P</div>
            <div className="w-[10%]">
              {Math.floor(winner.amount * 1000) / 1000} Sei
            </div>
            <div className="w-[10%]">
              {winner.score > winner.goal ? "Win" : "Lose"}
            </div>

            <div className="w-[25px] h-[25px]">
              {" "}
              <img src="/images/tetris.png" alt="Tetris" />{" "}
            </div>
            {/* <div className="w-[18%]">
              {calculateInterval(winner.updatedAt)} ago
            </div> */}
          </div>
        ))}
    </div>
  );
};

export default RecentScore;
