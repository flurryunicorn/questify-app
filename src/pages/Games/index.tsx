import { useState, useEffect, useContext } from "react";
import { GeneralPanel } from "../../components/Common/Panels";
import QuestLeaderboard from "../../components/Leaderboard/QuestLeaderboard";
import { useSelector, useDispatch } from "react-redux";
import { WalletWindowKey } from "@sei-js/core";
import { SeiWalletContext } from "@sei-js/react";
import { GAME_CONTENTS } from "../../data";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
  text-gray-200"
    >
      <div className="mx-2">
        <div className="text-white text-[25px] mt-5 mb-2">Library</div>
        <div className="grid gap-6 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 mb-6">
          {GAME_CONTENTS.map((game, index) => (
            <div
              className=" col-span-1 flex flex-col border-[1.2px] border-[#272829] rounded-[20px] p-[2px]
              relative cursor-pointer hover:border-primary"
              key={index}
              onClick={() => {
                console.log("selected");
              }}
            >
              <div className=" rounded-[15px] overflow-hidden w-full">
                <LazyLoadImage
                  alt={"game Image"}
                  // effect="blur"
                  src={game.thumbnail}
                  className="rounded-2xl"
                  width="100%"
                  height={"100%"}
                />
                {/* <img src={game.thumbnail}></img> */}
              </div>
              <div className="flex md:flex-row xs:flex-col-reverse my-[10px]">
                <div className="font-[500] text-[14px] text-center w-full">
                  <div className="text-[#929298]">{game.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games;
