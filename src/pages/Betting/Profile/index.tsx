import React, { useState, useEffect } from "react";
import BannerImage from "../../../components/Profile/BannerImage";
import BannerDescription from "../../../components/Profile/BannerDescription";
import { BorderPanel, GeneralPanel } from "../../../components/Common/Panels";
import {
  SEASON_MENUITEMS,
  DETAILED_LEADER_ITEMS,
  GAME_MENU_ITEMS,
  LEADERBOARD_MENUITEMS,
  LEADER_SUB_ITEMS,
  SUB_MENUITEMS,
} from "../../../data";
import BorderMenuItem from "../../../components/Common/Menus/BorderMenuItem";
import GeneralMenu from "../../../components/Common/Menus/GeneralMenu";
import LeaderItem from "../../../components/Betting/LeaderItem";
import LeaderSubList from "../../../components/Betting/LeaderSubList";
import ListItem from "../../../components/Betting/ListItem";
import { useSelector, useDispatch } from "react-redux";
import { apiCaller } from "../../../utils/fetcher";
import {
  setLeaderboard,
  setMyBalance,
} from "../../../redux/slices/tetrisSlice";
import RecentScoreList from "../../../components/Betting/RecentScoreList";

const Profile = () => {
  const dispatch = useDispatch();

  const { winners } = useSelector((state: any) => ({
    winners: state.tetris.winners,
  }));
  const fetchLeaderboard = async () => {
    var result = await apiCaller.get("tetrises/fetchLeaderboard");
    dispatch(setLeaderboard({ result: result.data.data }));
  };

  const initSocket = () => {
    // This part is main for socket.
    if (!(window as any).socket) {
      setTimeout(() => {
        initSocket();
      }, 10);
      return;
    }

    if (!(window as any).listen) {
      (window as any).socket.on("send-leaderboard", (data) => {
        dispatch(setLeaderboard(data));
      });
      (window as any).listen = true;
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    initSocket();
  }, []);

  return (
    <div className="grid grid-cols-17 gap-[30px] ml-[80px] mr-[20px] mt-[100px]  text-gray-200">
      <GeneralPanel style="col-span-12">
        <div className="w-full">
          <BannerImage />
          <BannerDescription />
        </div>
        <BorderPanel style="mt-[20px] !p-0">
          <div className="w-full h-[40px] bg-[#272829] rounded-t-[40px]">
            <div className="flex gap-8 text-[14px] pt-[10px] pl-[40px]">
              <div className=" text-gray-200">Last Games</div>
              <div className=" text-gray-200 opacity-60">Launch Game</div>
            </div>
          </div>
          <div className="p-4 pb-5 w-full">
            <GeneralMenu menuItems={GAME_MENU_ITEMS} />
            <ul className="w-full mt-4">
              {/* {DETAILED_LEADER_ITEMS.map((item, index) => (
                <ListItem key={index} {...item} />
              ))} */}
              {winners.tetrisInfo.slice(0, 5).map((item, index) => (
                <RecentScoreList key={index} {...item} />
              ))}
            </ul>
          </div>
        </BorderPanel>
      </GeneralPanel>
      <GeneralPanel style="col-span-5">
        <BorderPanel>
          {/* {
            <div className="flex gap-4 mb-2">
              {SUB_MENUITEMS.map((item, index) => (
                <BorderMenuItem key={index} {...item} />
              ))}
            </div>
          } */}
          <div>Reward Pool</div>
          <GeneralMenu menuItems={SEASON_MENUITEMS} />
          <div className="mt-2">
            <p className="text-[14px] font-500  text-gray-200 opacity-60 pb-4">
              These are the first season rewards, every wallet depending on how
              much they deposit will be able to claim more sei and more XP for
              our mainnet Launch
            </p>
          </div>
          {LEADER_SUB_ITEMS.slice(3, LEADER_SUB_ITEMS.length).map(
            (item, index) => (
              <LeaderSubList {...item} />
            )
          )}
          <div className="absolute top-[16px] text-[#DDDDDD] bg-[#696969] rounded-[5px] text-[12px] font-500 w-[70px] text-center">
            1000 $SEI
          </div>
        </BorderPanel>
        <BorderPanel style="mt-[18px] relative">
          <div className="flex justify-center">
            <div className="absolute top-[16px] text-[#DDDDDD] bg-[#696969] rounded-[5px] text-[12px] font-500 w-[70px] text-center">
              1000 $SEI
            </div>
            <div className="flex gap-2 mt-[24px]">
              <div className="">
                <div>
                  <div className="text-[16px] font-400  text-gray-200">
                    First Deposit
                  </div>
                  <div className="text-[30px] font-700  text-gray-200">
                    Bonus
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderPanel>
        <BorderPanel style="mt-[18px] ">
          <h1 className="text-[20px]  text-gray-200">Leaderboard</h1>
          <GeneralMenu menuItems={LEADERBOARD_MENUITEMS} />
          <div className="flex pt-[20px] gap-[24px] mb-2">
            {LEADER_SUB_ITEMS.slice(0, 3).map((leaderItem, index) => (
              <LeaderItem key={index} {...leaderItem} />
            ))}
          </div>
          {LEADER_SUB_ITEMS.length > 3 && (
            <div className="mt-[28px]">
              <h2>Last Matches</h2>
              {LEADER_SUB_ITEMS.slice(3, LEADER_SUB_ITEMS.length).map(
                (item, index) => (
                  <LeaderSubList {...item} />
                )
              )}
            </div>
          )}
          <button
            className="w-full text-[20px] font-500 text-[#FFFFFF] py-[8px] opacity-60 rounded-[5px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(22, 128, 60, 0.5) 0%, #87EEAB 100%)",
            }}
          >
            Place bet
          </button>
        </BorderPanel>
      </GeneralPanel>
    </div>
  );
};

export default Profile;
