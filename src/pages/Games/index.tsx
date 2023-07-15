import { useState, useEffect, useContext } from "react";
import { GeneralPanel } from "../../components/Common/Panels";
import QuestLeaderboard from "../../components/Leaderboard/QuestLeaderboard";
import { useSelector, useDispatch } from "react-redux";
import { WalletWindowKey } from "@sei-js/core";
import { SeiWalletContext } from "@sei-js/react";
import { GAME_CONTENTS } from "../../data";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { BorderPanel } from "../../components/Common/Panels";

export type GameContentType = {
  title: string;
  thumbnail: string;
};

const Games = () => {
  const { supportedWallets, connect, disconnect, installedWallets } =
    useContext(SeiWalletContext);
  const [connected, setConnected] = useState(false);

  const connected_wallet = localStorage.getItem(
    "connectedWallet"
  ) as WalletWindowKey;

  useEffect(() => {
    console.log("####", connected_wallet);
    if (connected) {
      connect(connected_wallet);
    }
  }, []);

  const { myInfo } = useSelector((state: any) => ({
    myInfo: state.tetris.myInfo,
  }));

  const { myXP } = useSelector((state: any) => ({
    myXP: state.tetris.myXP,
  }));

  useEffect(() => {
    console.log("👨", myXP, myInfo);
  }, [myInfo, myXP]);

  return (
    <div
      className="lg:gap-[30px] gap-[5px] ml-[5px] lg:ml-[20px] xl:ml-[50px] 2xl:ml-[100px] lg:mr-[20px] lg:mt-[100px] md:mt-[100px] sm:mt-[100px]  mt-[100px] mr-[00px]
  text-gray-200 mb-[100px]"
    >
      <div className="mx-2">
        <div className="text-white font-bold text-[25px] mt-5 mb-2">
          Library
        </div>
        <div className="grid gap-6 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 grid-cols-1 mb-6">
          {GAME_CONTENTS.map((game, index) => (
            <BorderPanel>
              <div
                className="col-span-1 flex flex-col p-[1px] cursor-pointer"
                key={index}
                // onClick={() => {
                //   console.log("selected");
                // }}
              >
                <div className="img-hover-zoom--brightness overflow-hidden w-full rounded-t-2xl">
                  {/* <LazyLoadImage
                    src={game.thumbnail}
                    effect="blur"
                    className="img-hover-zoom--blur rounded-t-2xl"
                    width="100%"
                    height={"100%"}
                  /> */}
                  <img src={game.thumbnail}></img>
                </div>
                <div className="flex md:flex-row xs:flex-col-reverse py-2">
                  <div className="text-[16px] text-center w-full">
                    <div className="text-[#929298] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-b hover:from-green-500 hover:to-white">
                      {game.title}
                    </div>
                  </div>
                </div>
              </div>
            </BorderPanel>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games;
