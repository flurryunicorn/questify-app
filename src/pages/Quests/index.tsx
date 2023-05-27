import React from "react";
import { GeneralPanel } from "../../components/Common/Panels";

import QuestLeaderboard from "../../components/Leaderboard/QuestLeaderboard";
import QuestBanner from "./QuestBanner";

function Item(props) {
  return <div>{props.item}</div>;
}

const Quests = () => {
  return (
    <div
      className="grid lg-grid-cols-17 xl:grid-cols-17 md:grid-cols-1 lg:gap-[30px] grid-cols-1 gap-[5px] 
      ml-[5px] lg:ml-[100px] lg:mr-[20px] lg:mt-[100px] md:mt-[100px] sm:mt-[100px] mr-[10px] mt-[50px]
      text-gray-200"
    >
      <GeneralPanel style="xl:col-span-12 lg:col-span-12 md-col-span-12 col-span-1">
        <QuestBanner title="Solarity Quests" />
        <QuestBanner title="All Quests" />
      </GeneralPanel>

      <GeneralPanel style="xl:col-span-5 lg:col-span-5 md:col-span-1 col-span-1">
        <QuestLeaderboard />
      </GeneralPanel>
    </div>
  );
};

export default Quests;
