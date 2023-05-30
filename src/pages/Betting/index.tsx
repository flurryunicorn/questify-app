import React, { useState, useEffect } from "react";
import { BorderPanel, GeneralPanel } from "../../components/Common/Panels";
import BettingBanner from "../../components/Betting/BettingBanner";
import { useSelector, useDispatch } from "react-redux";
import { LeftArrow, RightArrow } from "../../components/Icons";
import Switch from "../../components/Betting/Switch";
import GeneralMenu from "../../components/Common/Menus/GeneralMenu";
import {
  DETAILED_LEADER_ITEMS,
  GAME_MENU_ITEMS,
  LEADERBOARD_MENUITEMS,
  LEADER_ITEMS,
  SEASON_MENUITEMS,
} from "../../data";
import RecentScoreList from "../../components/Betting/RecentScoreList";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { apiCaller } from "../../utils/fetcher";
import { setLeaderboard, setMyBalance } from "../../redux/slices/tetrisSlice";
import LeaderScoreItem from "../../components/Betting/LeaderScoreItem";
import LeaderScoreList from "../../components/Betting/LeaderScoreList";
import { useQueryClient, useWallet, useSigningClient } from "@sei-js/react";
import { WEEK_GAMES } from "../../data";
import { BiPlus } from "react-icons/bi";
import PointLeaderboard from "../../components/Leaderboard/PointLeaderboard";

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
    var result = await apiCaller.get("tetrises/fetchLeaderboard");
    dispatch(setLeaderboard({ result: result.data.data }));
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
  const items = [
    <div>
      <BettingBanner
        title={"Tetrisk is here!"}
        backgroundImage={"/images/betting/banner111.png"}
        content={
          "Damage with Legendary Weapons. Play now to earn infinite rewards, and claim your airdrop!"
        }
        button={"Launch Now"}
      />
    </div>,
    // <div>
    //   <BettingBanner
    //     title={"Fable League is here!"}
    //     backgroundImage={"/images/betting/banner2.jpg"}
    //     content={
    //       "Damage with Legendary Weapons. Play now to earn infinite rewards, and claim your airdrop!"
    //     }
    //     button={"Lanuch Now"}
    //   />
    // </div>,
    // <div>
    //   <BettingBanner
    //     title={"Defi Land is here!"}
    //     backgroundImage={"/images/betting/banner3.jpg"}
    //     content={
    //       "Damage with Legendary Weapons. Play now to earn infinite rewards, and claim your airdrop!"
    //     }
    //     button={"Launch Now"}
    //   />
    // </div>,
    // <div>
    //   <BettingBanner
    //     title={"Buccaneer's Hunt is here!"}
    //     backgroundImage={"/images/betting/banner4.jpg"}
    //     content={
    //       "Damage with Legendary Weapons. Play now to earn infinite rewards, and claim your airdrop!"
    //     }
    //     button={"Launch Now"}
    //   />
    // </div>,
  ];

  const indicators = WEEK_GAMES.map((game, index) => (
    <div
      key={index}
      className={` rounded-lg overflow-hidden w-[64px] h-[64px] cursor-pointer`}
    >
      <img src={game.bgImg} className="rounded-[25px]" width={64} height={64} />
    </div>
  ));
  return (
    <div
      className="grid lg-grid-cols-17 xl:grid-cols-17 md:grid-cols-1 lg:gap-[30px] grid-cols-1 gap-[5px] 
      ml-[5px] lg:ml-[100px] lg:mr-[20px] lg:mt-[100px] md:mt-[100px] sm:mt-[100px] mr-[10px] mt-[50px]
      text-gray-200"
    >
      <GeneralPanel style="xl:col-span-12 lg:col-span-12 md-col-span-12 col-span-1">
        <div className="rounded-lg overflow-hidden border shadow-inner border-[#132236]  ">
          <Carousel
            autoPlay={false}
            // IndicatorIcon={indicators}
            // indicatorIconButtonProps={{
            //   style: {
            //     padding: "7px", // 1
            //     zIndex: "2",
            //     // width: '70px',
            //     // height: '70px',       // 3
            //   },
            // }}
            indicatorContainerProps={{
              style: {
                marginTop: "-75px",
                marginBottom: "10px", // 5
                marginLeft: "30px",
                textAlign: "left", // 4
              },
            }}
            activeIndicatorIconButtonProps={{
              style: {
                backgroundColor: "red", // 2
              },
            }}
          >
            {items.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </div>
        {/* <Switch
          onLeftArrowClick={() => { handlePrevClick }}
          onRightArrowClick={() => { handleNextClick }}
        /> */}
        {/* <div className="  font-bold text-[18px] pt-4 pb-2 w-32 ">
          <div className="from-emerald-400 w-22 text-transparent to-cyan-400 flex bg-gradient-to-r bg-clip-text">
            {" "}
            Last Games
          </div>
        </div> */}
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
        <BorderPanel>
          <div className="flex w-full px-4 py-2 bg-sky-600/5 border-[#132236] border-b  ">
            <div className="font-bold text-sm  text-gray-200 ">
              Weekly Giveaway
            </div>
          </div>

          <div className="flex flex-row mx-4 overflow-x">
            <div className="mt-[18px] w-[230px] mb-[18px] relative  rounded-lg border border-[#132236] justify-between">
              <div className="flex justify-center flex-col place-content-center">
                <div className="flex flex-col items-center justify-center h-[120px] top-[8px] bg-cyan-400/10 rounded-t-lg place-items-center">
                  <div className="flex justify-center">
                    <img
                      src={`/images/betting/tile.svg`}
                      alt="betting"
                      className="mt-[12px] w-[40%]"
                    />
                  </div>
                  <div
                    className="inline-block justify-center items-center rounded-full
                                 cursor-pointer px-[13px] py-1.5 
                              border border-[#29B080]  text-emerald-300 bg-emerald-300/20 font-bold mx-2 my-1 
                              hover:border-primary hover:opacity-[90%]"
                    onClick={() => {
                      navigate("/subbetting");
                    }}
                  >
                    <p className="text-[12px]">1000 SEI</p>
                  </div>
                </div>

                <div className="border-[#132236] border-b-[1px] flex flex-row py-2 justify-between ">
                  <div
                    className="flex justify-center items-center rounded-[40px] border-[1.2px]
                                font-[500] text-[14px]  cursor-pointer px-[13px] py-[-5px]
                            border-[#29B080] text-[#29B080] bg-[#162724] mx-2
                              hover:border-primary"
                  >
                    <p className="text-[10px]">Opened</p>
                  </div>
                  <div className="mx-2 text-[10px]">25/25 slots</div>
                </div>
                <div className="border-[#132236] border-b-[1px] flex flex-row py-2 justify-between text-[10px]">
                  <div className="mx-2">Min.Entry price</div>
                  <div className="mx-2">0.5 SEI </div>
                </div>
                <div className="border-[#132236] flex flex-row py-2 justify-between text-[10px]">
                  <div className="mx-2"> End in </div>
                  <div className="mx-2"> 00:02:52 </div>
                </div>
              </div>
            </div>

            <div className="mt-[18px] mx-5 bg-green-400/5 mb-[18px] relative w-[230px] rounded-xl border border-dotted border-[#29B080] pb-[20px]  flex justify-center items-center">
              <div className="my-[20%] justify-center flex items-center flex-col">
                <div className="flex justify-center border-green-400 my-2 text-green-500 items-center  border rounded-full  h-12 w-12 bg-emerald-600/20 flex-col cursor-pointer">
                  <BiPlus />
                </div>
                <div className="text-center lg:text-[16px] md:text-[14px] sm:text-[14px] text-[12px] ]">
                  More Coming Soon
                </div>
              </div>
            </div>
          </div>
        </BorderPanel>

        {/* <PrimaryButton caption="gotoSubBetting" onClick={() => { navigate('/subbetting') }} /> */}
      </GeneralPanel>
      {/* HERE RIGHT BAR */}

      <GeneralPanel style="xl:col-span-5 lg:col-span-5 md:col-span-1 col-span-1">
        <PointLeaderboard />

        <BorderPanel style="mt-[12px] relative">
          <div className="flex h-34   overflow-hidden flex-row justify-between">
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

export default Betting;
