import React, { useState, useEffect } from "react";
import { BorderPanel, GeneralPanel } from "../../../components/Common/Panels";
import GeneralMenu from "../../../components/Common/Menus/GeneralMenu";
import {
  SEASON_MENUITEMS,
  DETAILED_LEADER_ITEMS,
  GAME_MENU_ITEMS,
  LEADERBOARD_MENUITEMS,
  LEADERBOARD_SUB_MENUITEMS,
  LEADER_SUB_ITEMS,
  SUB_MENUITEMS,
} from "../../../data";
import LeaderSubList from "../../../components/Betting/LeaderSubList";
import LeaderItem from "../../../components/Betting/LeaderItem";
import ListItem from "../../../components/Betting/ListItem";
import GameDivision from "./GameDivision";
import Description from "./Description";
import BorderMenuItem from "../../../components/Common/Menus/BorderMenuItem";
import { PrimaryButton } from "../../../components/Common/Buttons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RecentScoreList from "../../../components/Betting/RecentScoreList";
import {
  setLeaderboard,
  setMyBalance,
} from "../../../redux/slices/tetrisSlice";
import { apiCaller } from "../../../utils/fetcher";
import { Style } from "@mui/icons-material";
import LeaderScoreItem from "../../../components/Betting/LeaderScoreItem";
import LeaderScoreList from "../../../components/Betting/LeaderScoreList";
import { LEADER_ITEMS } from "../../../data";
import { toast } from "react-toastify";
import PointLeaderboard from "../../../components/Leaderboard/PointLeaderboard";

const SubBettingPage = () => {
  const [loading, setIsloading] = useState(true);
  const [totalUser, setTotalUser] = useState(0);
  const { winners } = useSelector((state: any) => ({
    winners: state.tetris.winners,
  }));

  const dispatch = useDispatch();

  const [sortedWinners, setSortedWinners] = useState<any>([]);
  const fetchLeaderboard = async () => {
    try {
      var result = await apiCaller.get("users/fetchLeaderboard");
      dispatch(setLeaderboard({ result: result.data.data }));
    } catch (error) {
      toast.error("Cannot fetch Data!");
    }
  };
  const fetchTotalUser = async () => {
    try {
      var result = await apiCaller.get("tetrises/fetchTotalUser");
      setTotalUser(result.data.data);
    } catch (err) {
      toast.warn("Cannot fetch Data!");
    }
  };

  // const initSocket = () => {
  //   // This part is main for socket.
  //   if (!(window as any).socket) {
  //     setTimeout(() => {
  //       initSocket();
  //     }, 10);
  //     return;
  //   }

  //   if (!(window as any).listen) {
  //     (window as any).socket.on("send-leaderboard", (data) => {
  //       dispatch(setLeaderboard(data));
  //     });
  //     (window as any).listen = true;
  //   }
  // };

  useEffect(() => {
    fetchLeaderboard();
    fetchTotalUser();
    // initSocket();
  }, []);

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
      setIsloading(false);
    }
  }, [winners]);

  const navigate = useNavigate();

  return (
    <div
      className="grid xl:grid-cols-17 lg:grid-cols-17 md:grid-cols-11 grid-cols-1 lg:gap-[30px] md:gap-[30px] gap-[5px] 
    ml-[10px] lg:ml-[100px] lg:mr-[20px] lg:mt-[100px] md:mt-[100px] sm:mt-[100px] mr-[10px] mt-[50px]
    text-gray-200"
    >
      <GeneralPanel style="lg:col-span-12 md:col-span-12 col-span-1">
        <div className="relative min-h-[320px]">
          <img
            src="/images/betting/sub-bet.png"
            alt="bet"
            className="rounded-t-[16px] min-h-[320px]"
          />
          <div className="absolute top-[50%] text-[#DDDDDD] bg-[#030A13]  rounded-[20px] lg:w-[35%] px-4 py-5 font-500 text-center ml-3 mt-2">
            <div className="flex justify-start">Tetrisk</div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col text-sm">
                <div className="flex justify-start text-[12px] mt-2 items-center">
                  Minimum Bet:
                  <span className="text-[20px] mx-2 flex flex-row items-center">
                    0.01
                    <span className="">
                      <img src="/images/sei-icon.png" />
                    </span>
                  </span>
                </div>
                <div className="flex justify-start text-[12px] mt-2 flex-row items-center">
                  <div>Play this game:</div>
                  <div className="mx-2 flex items-center justify-center text-[#29B080]">
                    <div className="text-center">
                      {" "}
                      {totalUser.toLocaleString("en-US")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div
                  className="bg-[#29B080] text-black rounded-[20px] w-[80px] h-[30px] cursor-pointer text-[16px] flex items-center justify-center"
                  onClick={() =>
                    window.open(
                      "https://questify-game-tetrisk-testing.web.app",
                      "_blank"
                    )
                  }
                >
                  Play
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="custom-2xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-1 sm:col-span-1 xs:col-span-1 mt-6">
          <Description
            title={"Tetrisk"}
            description={
              "The classic four-block puzzle game..with a degen twist. Are you really willing to risk it and put your money where your 🟪🟪🟪🟪 is?"
            }
          />
        </div>

        <div className="flex gap-2">
          {LEADERBOARD_SUB_MENUITEMS.map((item, index) => (
            <BorderMenuItem key={index} {...item} />
          ))}
        </div>

        <BorderPanel style="my-6 !p-0">
          <div className="w-full h-[40px] border-[#132236] border-b bg-cyan-500/5 rounded-t-lg">
            <div className="flex gap-8 text-[14px] pt-[10px] pl-[20px]">
              <div className="text-gray-200 text-sm font-bold">
                All Competitions
              </div>
              {/* <div className=" text-gray-200 opacity-60">Launch Game</div> */}
            </div>
          </div>
          <div className=" w-full">
            {/* <GeneralMenu menuItems={GAME_MENU_ITEMS} /> */}
            {!loading && (
              <ul className="w-full">
                {winners.tetrisInfo.slice(0, 4).map((item, index) => (
                  <RecentScoreList key={index} {...item} />
                ))}
              </ul>
            )}
          </div>
        </BorderPanel>
      </GeneralPanel>

      {/* HERE RIGHT BAR */}

      <GeneralPanel style="xl:col-span-5 lg:col-span-5 md:col-span-1 col-span-1">
        <PointLeaderboard />

        {/* <div className="my-6 ml-2 relative">
          <img src="/images/betting/Group2.png" className="m-[-15px]" />

        </div> */}

        <BorderPanel style="mt-[12px] relative">
          <div className="flex h-34 overflow-hidden flex-row justify-between">
            <div className="">
              <img
                src="/images/betting/Group2.png"
                className=" w-full -mt-2 ml-2 "
              />
            </div>
            {/* <div className="">
              <img
                src="/images/betting/funbooks.png"
                alt="passport"
                className="w-[125px] h-[112px]"
              />
            </div> */}
          </div>
        </BorderPanel>

        <BorderPanel style="mt-[12px] relative">
          <h1 className="text-[20px] mx-4 my-2 text-gray-100">Reward Pool</h1>
          <GeneralMenu menuItems={SEASON_MENUITEMS} />
          <div className=" rounded-[12px]  p-[10px]">
            <h2 className="text-[15px] font-500  text-gray-200">
              Questify First Missions
            </h2>
            <p className="text-[14px] font-500 my-3  text-gray-300 pb-4">
              Go to your profile, complete your quests and get access to the SEI
              Battle Pass, get loot boxes and win NFTs and Tokens from all the
              ecosystem! Unlocked on Mainnet
            </p>
            <div className="m-[-12px]">
              <img src={"/images/betting/Group1.png"} />
            </div>
          </div>
        </BorderPanel>
      </GeneralPanel>
    </div>
  );
};

export default SubBettingPage;
