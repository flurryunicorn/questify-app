import React from "react";
import { LeaderItemType } from "../LeaderItem";
import LeaderListItem from "./LeaderListItem";
import { minifyAddress } from "../../../utils";

type LeaderListType = {
  items: any[];
}

const LeaderList = (props: LeaderListType) => {
  return (
    <ul className="w-full">
        {props.items.map((item, index) => (
          <LeaderListItem 
            key={index}
            no={index + 4}
            type={false}
            avatarUrl={'/images/betting/bepplee.png'}
            name={minifyAddress(item.wallet, 3)}
            score={item.totalScore}
          />
        ))}
    </ul>
  );
}

export default LeaderList;