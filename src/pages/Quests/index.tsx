import { useState, useEffect, useContext } from "react";
import { GeneralPanel } from "../../components/Common/Panels";
import QuestLeaderboard from "../../components/Leaderboard/QuestLeaderboard";
import QuestBanner from "../../components/Quests/QuestBanner";
import QuestProgress from "../../components/Quests/QuestProgress";
import { useSelector, useDispatch } from "react-redux";
import { WalletWindowKey } from "@sei-js/core";
import { SeiWalletContext } from "@sei-js/react";
import Grid from "@mui/material/Grid";

const Quests = () => {
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
    <div>
      <div
        className="lg:gap-[30px] gap-[5px] ml-[5px] lg:ml-[20px] xl:ml-[50px] 2xl:ml-[100px] lg:mr-[20px] lg:mt-[100px] md:mt-[100px] sm:mt-[100px] mr-[10px] mt-[50px]
      text-gray-200"
      >
        <Grid
          container
          spacing={0}
          columns={{ xl: 12, lg: 12, md: 12, sm: 4, xs: 4 }}
        >
          <Grid item xl={8} lg={8} md={8} sm={4} xs={4}>
            <GeneralPanel>
              <QuestBanner
                title="Questify Quests"
                id={0}
                icon="/images/logos/main-logo.png"
                reward="Compass NFT + 550"
              />
              <QuestBanner
                title="Tetrisk Quests"
                id={1}
                icon="/images/logos/tetris-logo.png"
                reward="Tetrisk WL + 550"
              />
            </GeneralPanel>
          </Grid>
          <Grid item xl={3} lg={4} md={4} sm={4} xs={4}>
            <GeneralPanel>
              <QuestLeaderboard />
              {/* <QuestProgress /> */}
            </GeneralPanel>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Quests;
