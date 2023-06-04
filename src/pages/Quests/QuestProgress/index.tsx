import { BorderPanel } from "../../../components/Common/Panels";
import { useState } from "react";
import { setMyXP } from "../../../redux/slices/tetrisSlice";
import { useSelector } from "react-redux";

const QuestProgress = ({ progress }) => {
  let lvl =
    progress < 500
      ? 1
      : progress < 1000
      ? 2
      : progress < 2000
      ? 3
      : progress < 4000
      ? 4
      : 5;
  const total = 500 * Math.pow(2, lvl - 1);
  const w = (Number(progress) * 100) / Number(total);
  const [progressValue, setProgressValue] = useState(Number(progress));

  return (
    <BorderPanel>
      <h1 className="text-[20px] mx-4 my-3 text-md  text-gray-200">
        Quest Progress
      </h1>
      <div className="flex flex-row justify-center mb-5">
        <div className="z-15 ml-[-15px]">
          <img
            src="/images/quests/Avatar.png"
            width="100px"
            className=" rounded-lg"
          />
        </div>
        <div className="mt-5">
          <div className="parent_div lg:w-[14vw] w-[60vw]">
            <div className="progress_icon"></div>
            <div className="progress_lvl">{lvl}</div>
            <div className="child_div" style={{ width: `${w}%` }}></div>
            <span className="progress_text">{`${progress.toString()}/${total}`}</span>
          </div>
        </div>
      </div>
    </BorderPanel>
  );
};

export default QuestProgress;
