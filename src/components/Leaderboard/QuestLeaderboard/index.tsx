import React, { useState, useEffect } from "react";
import { BorderPanel, GeneralPanel } from "../../../components/Common/Panels";
import { useSelector, useDispatch } from "react-redux";
import GeneralMenu from "../../../components/Common/Menus/GeneralMenu";
import { LEADERBOARD_MENUITEMS, LEADER_ITEMS } from "../../../data";
import { apiCaller } from "../../../utils/fetcher";
import { setLeaderboard } from "../../../redux/slices/tetrisSlice";
import LeaderScoreItem from "../../../components/Betting/LeaderScoreItem";
import LeaderScoreList from "../../../components/Betting/LeaderScoreList";
import LeaderXPItem from "../../Betting/LeaderXPItem";
import { QUEST_LEADERBOARD_SUB_MENUITEMS } from "../../../data";
import QuestBorderMenuItem from "../../Common/Menus/QuestBorderMenuItem";
import LeaderXPList from "../../Betting/LeaderXPList";
import { ToastContainer, toast } from "react-toastify";

const QuestLeaderboard = () => {
  const dispatch = useDispatch();

  const fetchLeaderboard = async () => {
    try {
      var result = await apiCaller.get("tetrises/fetchLeaderboard");
      dispatch(setLeaderboard({ result: result.data.data }));
    } catch (error) {
      toast.error("Cannot fetch Data!");
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    // initSocket();
  }, []);
  const [loading, setIsloading] = useState(true);
  const { winners } = useSelector((state: any) => ({
    winners: state.tetris.winners,
  }));

  const [sortedWinners, setSortedWinners] = useState<any>([]);

  useEffect(() => {
    let tempWinners = Object.assign({ ...winners });
    if (
      Object.keys(tempWinners) &&
      Object.keys(tempWinners).indexOf("showXPInfo") > -1 &&
      tempWinners.showXPInfo.length > 0
    ) {
      tempWinners = [...tempWinners.showXPInfo].sort(
        (a, b) => b.totalXP - a.totalXP
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
      setIsloading(false);
    }
  }, [winners]);

  return (
    <BorderPanel style=" ">
      <h1 className="text-[20px] mx-4 my-3 text-md  text-gray-200">
        Quest Leaderboard
      </h1>
      <div className="flex justify-center gap-2 w-full mt-4 border-t border-b border-[#132236] py-2">
        {QUEST_LEADERBOARD_SUB_MENUITEMS.map((item, index) => (
          <QuestBorderMenuItem key={index} {...item} />
        ))}
      </div>
      <div className="flex justify-between  pt-[30px] mb-3">
        {sortedWinners.slice(0, 3).map((leaderItem, index) => (
          <LeaderXPItem
            key={index}
            {...{ ...leaderItem, no: index + 1 }}
            style={{ height: "200px", flex: "1 1 auto" }} // Set a fixed height and flex properties
          />
        ))}
      </div>
      {LEADER_ITEMS.length > 3 && (
        <div className="mt-[16px]">
          {/* <LeaderList items={LEADER_ITEMS.slice(3, LEADER_ITEMS.length)} /> */}
          <ul
            className="w-full mt-4 border-t border-[#132236] py-2"
            style={{ marginTop: "15px" }}
          >
            {sortedWinners.slice(3, 6).map((item, index) => (
              <LeaderXPList key={index} {...{ ...item, no: index + 4 }} />
            ))}
          </ul>
        </div>
      )}
    </BorderPanel>
  );
};

export default QuestLeaderboard;
