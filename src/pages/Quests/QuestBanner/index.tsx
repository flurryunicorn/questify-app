import React, { useContext } from "react";
import { toast } from "react-toastify";
import { BorderPanel } from "../../../components/Common/Panels";
import QuestBox from "../QuestBox";
import { QuestBoxType } from "../QuestBox";
import { useEffect, useState } from "react";
import { apiCaller } from "../../../utils/fetcher";
import { setMyInfo } from "../../../redux/slices/tetrisSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  setModalOpen,
  setClickedCardNum,
  setMyXP,
} from "../../../redux/slices/tetrisSlice";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

// import { QUESTIFY_QUESTS } from "../../../data";

export interface QuestBannerProps {
  title: string;
  id: number;
}

const QUESTIFY_QUESTS: QuestBoxType[] = [
  {
    title: "Daily Quest",
    subTitle: "Daily Quests",
    description: "Play Game EveryDay",
    avatar: "/images/quests/avatars/discord.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/solarity-discord.png",
    fullDescription: "This is Daily Quest. Check and play everyday!!!",
    untilClaim: 1,
  },
  {
    title: "x10 Play",
    subTitle: "x10 Play",
    description: "Play 10 times",
    avatar: "/images/social/twitter.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/mint-room.png",
    fullDescription:
      "Play the game more than 10 times to claim your quests. Try!!!",
    untilClaim: 10,
  },
  {
    title: "Win Game",
    subTitle: "Win Game",
    description: "Win the Game for the first time",
    avatar: "/images/quests/avatars/extension.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/extension.png",
    fullDescription:
      "First Win, and First Claim. Be winner to claim your quests",
    untilClaim: 1,
  },
  {
    title: "x5 Win",
    subTitle: "x5 Win",
    description: "Win the Game 5 times",
    avatar: "/images/quests/avatars/prompt.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/prompt.png",
    fullDescription: "Win again and again, more than 5 times. ",
    untilClaim: 5,
  },
];
const TETRISK_QUESTS: QuestBoxType[] = [
  {
    title: "Daily Quest",
    subTitle: "Daily Quests",
    description: "Play Game EveryDay",
    avatar: "/images/quests/avatars/discord.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/solarity-discord.png",
  },
  {
    title: "x10 Play",
    subTitle: "x10 Play",
    description: "Play 10 times",
    avatar: "/images/social/twitter.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/mint-room.png",
  },
  {
    title: "Win Game",
    subTitle: "Win Game",
    description: "Win the Game for the first time",
    avatar: "/images/quests/avatars/extension.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/extension.png",
  },
  {
    title: "x5 Win",
    subTitle: "x5 Win",
    description: "Win the Game 5 times",
    avatar: "/images/quests/avatars/prompt.png",
    icon: "/images/wallets/xp.png",
    amount: 100,
    thumbnail: "/images/quests/solarity-quests/prompt.png",
  },
];

const stylex = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 345,
  border: 1,
  borderColor: "#6C9C6E",
  borderRadius: "20px",
  font: "IBMPlexMono-Regular",
  boxShadow: "0 0 10px 0 rgb(43, 100, 50)",
};

const QuestBanner = (props: QuestBannerProps) => {
  const dispatch = useDispatch();

  const [questStatus, setQuestStatus] = useState(new Array(4).fill(0));

  const { myInfo } = useSelector((state: any) => ({
    myInfo: state.tetris?.myInfo,
  }));

  useEffect(() => {
    console.log("🙌", myInfo);
  }, []);

  const wallet = localStorage.getItem("connectedAddress");

  const setInitial = async () => {
    if (wallet) {
      console.log("😘", wallet);
      const result = await apiCaller.post("tetrises/getMyInfo", {
        wallet,
      });
      console.log("👌", result);
      await dispatch(setMyInfo({ myInfo: result.data.data }));
    } else {
      toast.warn("You should connect wallet first!");
      console.log("😘", wallet);
      const result = await apiCaller.post("tetrises/getMyInfo", {
        wallet: "template",
      });
      console.log("👌", result);
      await dispatch(setMyInfo({ myInfo: result.data.data }));
    }
  };

  useEffect(() => {
    setInitial();
  }, []);

  useEffect(() => {
    console.log("💕", myInfo);
    let statusArray = new Array(4).fill(0);

    for (let i = 0; i < 4; i++) {
      statusArray[i] =
        myInfo.tetris?.allQuests[i] + myInfo.tetris?.receivedQuests[i];
    }
    console.log("🤣", statusArray);

    setQuestStatus(statusArray);
  }, [myInfo]);

  const { modalOpen } = useSelector((state: any) => ({
    modalOpen: state.tetris.modalOpen,
  }));

  const { clickedCardNum } = useSelector((state: any) => ({
    clickedCardNum: state.tetris.clickedCardNum,
  }));
  const handleOpen = () => {
    dispatch(setModalOpen({ modalOpen: true }));
  };
  const handleClose = async () => {
    dispatch(setModalOpen({ modalOpen: false }));
  };

  return (
    <BorderPanel>
      <div className="flex w-full px-4 py-2 bg-sky-600/5 border-[#132236] border-b  ">
        <div className="font-bold text-sm  text-gray-200 ">{props.title}</div>
      </div>

      <div className="flex flex-row justify-center items-center content-center pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 custom-2xl:grid-cols-5 gap-4 mb-8 justify-between">
          {props.id == 0 &&
            QUESTIFY_QUESTS.map((quest, index) => (
              <div>
                <QuestBox
                  key={index}
                  {...quest}
                  index={index}
                  active={questStatus[index]}
                />
              </div>
            ))}
          {props.id == 1 &&
            TETRISK_QUESTS.map((quest, index) => (
              <QuestBox
                key={index}
                {...quest}
                index={index}
                active={questStatus[index]}
              />
            ))}
        </div>
      </div>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Card sx={stylex}>
          <CardMedia
            style={{ background: "white" }}
            component="img"
            height="140"
            image={QUESTIFY_QUESTS[clickedCardNum].thumbnail}
          />
          <CardContent
            sx={{
              background: "black",
              color: "white",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {QUESTIFY_QUESTS[clickedCardNum].title}{" "}
              {clickedCardNum == 0 ? (
                questStatus[clickedCardNum] == 0 ? (
                  <span>(0/1)</span>
                ) : (
                  <span>(1/1)</span>
                )
              ) : clickedCardNum == 1 ? (
                <span>({Number(myInfo.totalPlay)}/10)</span>
              ) : clickedCardNum == 2 ? (
                <span>({Number(myInfo.tetris.wins.length) > 0 ? 1 : 0}/1)</span>
              ) : (
                <span>
                  (
                  {Number(myInfo.tetris.wins.length) > 5
                    ? 5
                    : Number(myInfo.tetris.wins.length)}
                  /5)
                </span>
              )}
            </Typography>
            <Typography variant="body2" color="">
              {QUESTIFY_QUESTS[clickedCardNum].fullDescription}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              background: "black",
              color: "white",
              display: "flex",
              justifyContent: "end",
            }}
          >
            {questStatus[clickedCardNum] == 2 && (
              <Button
                size="small"
                color="success"
                variant="outlined"
                sx={{ marginRight: "10px" }}
              >
                Claimed
              </Button>
            )}
            {questStatus[clickedCardNum] == 1 && (
              <Button
                size="small"
                color="success"
                variant="contained"
                sx={{ marginRight: "10px" }}
                onClick={async () => {
                  const result = await apiCaller.post("tetrises/receiveQuest", {
                    wallet: localStorage.getItem("connectedAddress"),
                    index: clickedCardNum,
                  });
                  dispatch(setMyInfo({ myInfo: result.data.existingUser }));
                  // console.log("😁😁", result);
                  dispatch(
                    setMyXP({ myXP: result.data.existingUser?.totalXP })
                  );
                }}
              >
                Claim quests
              </Button>
            )}
            {questStatus[clickedCardNum] == 0 && (
              <Button
                size="small"
                color="success"
                variant="contained"
                sx={{ marginRight: "10px" }}
                // onClick={handleClose}
                onClick={() => {
                  window.open(
                    "https://questify-game-tetrisk-testing.web.app",
                    "_blank"
                  );
                }}
              >
                Play Game
              </Button>
            )}
          </CardActions>
        </Card>
      </Modal>
    </BorderPanel>
  );
};

export default QuestBanner;
