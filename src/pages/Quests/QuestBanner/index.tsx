import { toast } from "react-toastify";
import { BorderPanel } from "../../../components/Common/Panels";
import QuestBox from "../QuestBox";
import { QuestBoxType } from "../QuestBox";
import { useEffect, useState } from "react";
import { apiCaller } from "../../../utils/fetcher";
import { setMyInfo } from "../../../redux/slices/tetrisSlice";
import { useSelector } from "react-redux";

// import { QUESTIFY_QUESTS } from "../../../data";

export interface QuestBannerProps {
  title: string;
  id: number;
}

const QUESTIFY_QUESTS: QuestBoxType[] = [
  {
    title: "Daily Quest",
    subTitle: "Daily Quests",
    description: "Play Game EveryDay",
    avatar: "/images/quests/avatars/discord.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/solarity-discord.png",
  },
  {
    title: "x10 Play",
    subTitle: "x10 Play",
    description: "Play 10 times",
    avatar: "/images/social/twitter.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/mint-room.png",
  },
  {
    title: "Win Game",
    subTitle: "Win Game",
    description: "Win the Game for the first time",
    avatar: "/images/quests/avatars/extension.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/extension.png",
  },
  {
    title: "x5 Win",
    subTitle: "x5 Win",
    description: "Win the Game 5 times",
    avatar: "/images/quests/avatars/prompt.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/prompt.png",
  },
];
const TETRISK_QUESTS: QuestBoxType[] = [
  {
    title: "Daily Quest",
    subTitle: "Daily Quests",
    description: "Play Game EveryDay",
    avatar: "/images/quests/avatars/discord.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/solarity-discord.png",
  },
  {
    title: "x10 Play",
    subTitle: "x10 Play",
    description: "Play 10 times",
    avatar: "/images/social/twitter.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/mint-room.png",
  },
  {
    title: "Win Game",
    subTitle: "Win Game",
    description: "Win the Game for the first time",
    avatar: "/images/quests/avatars/extension.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/extension.png",
  },
  {
    title: "x5 Win",
    subTitle: "x5 Win",
    description: "Win the Game 5 times",
    avatar: "/images/quests/avatars/prompt.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/prompt.png",
  },
];

const QuestBanner = (props: QuestBannerProps) => {
  const { myInfo } = useSelector((state: any) => ({
    myInfo: state.tetris?.myInfo,
  }));

  // console.log("❤️", data);

  var activeList: number[] = [0, 0, 0, 0];

  for (let j = 0; j < activeList.length; j++) {
    if (
      myInfo.tetris?.allQuests[j] === 1 &&
      myInfo.tetris?.receivedQuests[j] === 1
    ) {
      activeList[j] = 1;
    } else if (
      myInfo.tetris?.allQuests[j] === 1 &&
      myInfo.tetris?.receivedQuests[j] === 0
    ) {
      activeList[j] = 2;
    } else {
      activeList[j] = 0;
    }
  }

  console.log(
    myInfo.tetris?.allQuests,
    myInfo.tetris?.receivedQuests,
    activeList
  );

  return (
    <BorderPanel>
      <div className="flex w-full px-4 py-2 bg-sky-600/5 border-[#132236] border-b  ">
        <div className="font-bold text-sm  text-gray-200 ">{props.title}</div>
      </div>

      <div className="flex flex-row justify-center items-center content-center pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 custom-2xl:grid-cols-5 gap-4 mb-8 justify-between">
          {props.id == 0 &&
            QUESTIFY_QUESTS.map((quest, index) => (
              <QuestBox
                key={index}
                {...quest}
                index={index}
                active={activeList[index]}
              />
            ))}
          {props.id == 1 &&
            TETRISK_QUESTS.map((quest, index) => (
              <QuestBox
                key={index}
                {...quest}
                index={index}
                active={activeList[index]}
              />
            ))}
        </div>
      </div>
    </BorderPanel>
  );
};

export default QuestBanner;
