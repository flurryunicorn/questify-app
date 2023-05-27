import React, { useState, useEffect } from "react";
import { BorderPanel } from "../../../components/Common/Panels";

import { useNavigate } from "react-router-dom";

import { BiPlus } from "react-icons/bi";
import QuestBox from "../QuestBox";
import { SOLARITY_QUESTS } from "../../../data";

export interface QuestBannerProps {
  title: string;
}

const QuestBanner = (props: QuestBannerProps) => {
  const navigate = useNavigate();

  return (
    <BorderPanel>
      <div className="flex w-full px-4 py-2 bg-sky-600/5 border-[#132236] border-b  ">
        <div className="font-bold text-sm  text-gray-200 ">{props.title}</div>
      </div>

      <div className="flex flex-row justify-center items-center content-center pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 custom-2xl:grid-cols-5 gap-8 mb-8 justify-between">
          {SOLARITY_QUESTS.map((quest, index) => (
            <QuestBox key={index} {...quest} index={index} onClick={() => {}} />
          ))}
        </div>
      </div>
    </BorderPanel>
  );
};

export default QuestBanner;
