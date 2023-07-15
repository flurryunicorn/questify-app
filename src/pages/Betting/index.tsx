import React, { useState, useEffect } from "react";
import { useQueryClient, useWallet, useSigningClient } from "@sei-js/react";
import { useSelector, useDispatch } from "react-redux";
import { setLeaderboard, setMyBalance } from "../../redux/slices/tetrisSlice";
import Switch from "../../components/Betting/Switch";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";

import RecentScoreList from "../../components/Betting/RecentScoreList";
import GeneralMenu from "../../components/Common/Menus/GeneralMenu";
import { apiCaller } from "../../utils/fetcher";
import {
  BETTING_BANNER_ITEMS,
  GAME_MENU_ITEMS,
  SEASON_MENUITEMS,
} from "../../data";
import { WEEK_GAMES } from "../../data";
import BettingBanner from "../../components/Betting/BettingBanner";
import PointLeaderboard from "../../components/Leaderboard/PointLeaderboard";
import WeeklyGiveWay from "../../components/Betting/WeeklyGiveWay";
import RewardPool from "../../components/Betting/RewardPool";
import SeiLootBox from "../../components/Betting/SeiLootBox";
import { BorderPanel, GeneralPanel } from "../../components/Common/Panels";

import Grid from "@mui/material/Grid";

function Item(props) {
  return <div>{props.item}</div>;
}

const Betting = () => {
  const [currentAmount, setCurrentAmount] = useState(0);
  const [connected, setConnected] = useState(false);
  const [loading, setIsloading] = useState(true);
  const { queryClient } = useQueryClient();
  const { balance } = useSelector((state: any) => ({
    balance: state.tetris.balance,
  }));

  const { connectedWallet, offlineSigner, accounts } = useWallet();

  const dispatch = useDispatch();

  const fetchLeaderboard = async () => {
    var result = await apiCaller.get("users/fetchLeaderboard");
    dispatch(setLeaderboard({ result: result.data.data }));
  };

  useEffect(() => {
    fetchLeaderboard();
    // initSocket();
  }, []);

  const { winners } = useSelector((state: any) => ({
    winners: state.tetris.winners,
  }));

  const [sortedWinners, setSortedWinners] = useState<any>([]);

  let tempWinners = Object.assign({ ...winners });
  // console.log(tempWinners);
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

  const items = BETTING_BANNER_ITEMS.map((item, index) => (
    <div key={index}>
      <BettingBanner
        title={item.title}
        backgroundImage={item.backgroundImage}
        content={item.content}
        button={item.button}
      />
    </div>
  ));

  const indicators = WEEK_GAMES.map((game, index) => (
    <div
      key={index}
      className={`overflow-hidden w-[50px] h-[50px] cursor-pointer`}
    >
      <img src={game.bgImg} className="rounded-full" />
    </div>
  ));

  return (
    <div className="lg:gap-[30px] gap-[5px] 2xl:ml-[100px] xl:ml-[50px] lg:ml-[20px] ml-[5px]  lg:mr-[20px] sm:mt-[100px] mr-[10px] mt-[80px] mb-[80px] text-gray-200">
      <Grid
        container
        spacing={0}
        columns={{ xl: 12, lg: 12, md: 12, sm: 4, xs: 4 }}
      >
        <Grid item xl={11} lg={11} md={11} sm={4} xs={4}>
          <GeneralPanel>
            <div className="rounded-lg overflow-hidden border shadow-inner border-[#132236]  ">
              <Carousel
                autoPlay={false}
                IndicatorIcon={indicators}
                indicatorIconButtonProps={{
                  style: {
                    padding: "7px",
                    zIndex: "2",
                  },
                }}
                indicatorContainerProps={{
                  style: {
                    marginTop: "-100px",
                    marginBottom: "10px", // 5
                    marginLeft: "20px",
                    textAlign: "left", // 4
                  },
                }}
                activeIndicatorIconButtonProps={{
                  style: {
                    backgroundColor: "green", // 2
                  },
                }}
              >
                {items.map((item, i) => (
                  <Item key={i} item={item} />
                ))}
              </Carousel>
            </div>
          </GeneralPanel>
        </Grid>

        <Grid item xl={8} lg={8} md={8} sm={4} xs={4}>
          <GeneralPanel>
            <BorderPanel style="my-6 !p-0">
              <div className="w-full h-[40px] border-[#132236] border-b bg-cyan-500/5 rounded-t-lg">
                <div className="flex gap-8 text-[14px] pt-[10px] pl-[20px]">
                  <div className="text-gray-200 text-sm font-bold">
                    All Competitions
                  </div>
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

            <WeeklyGiveWay />
          </GeneralPanel>
        </Grid>

        <Grid item xl={3} lg={4} md={4} sm={4} xs={4}>
          <GeneralPanel>
            <PointLeaderboard />
            <SeiLootBox />
            <RewardPool />
          </GeneralPanel>
        </Grid>
      </Grid>
    </div>
  );
};

export default Betting;
