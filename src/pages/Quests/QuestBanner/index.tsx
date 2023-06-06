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
  setMyXP,
  setDepositModalOpen,
} from "../../../redux/slices/tetrisSlice";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { QUESTIFY_QUESTS } from "../../../data";
export interface QuestBannerProps {
  title: string;
  id: number;
}

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

  const [questStatus, setQuestStatus] = useState(new Array(12).fill(0));

  const [questifyCount, setQuestifyCount] = useState(new Array(4).fill(0));
  const [tetrisCount, setTetrisCount] = useState(new Array(8).fill(0));

  const { myInfo } = useSelector((state: any) => ({
    myInfo: state.tetris?.myInfo,
  }));

  useEffect(() => {
    console.log("🙌", myInfo);
  }, []);

  const wallet = localStorage.getItem("connectedAddress");

  const setInitial = async () => {
    console.log("-- SetInitial is called --");
    if (wallet) {
      console.log("😘", wallet);
      const result = await apiCaller.post("users/getMyInfo", {
        wallet,
      });
      console.log("👌", result.data.data);
      await dispatch(setMyInfo({ myInfo: result.data.data }));
      setQuestifyCount(result.data.data.trackedQuests);
      setTetrisCount(result.data.data.tetris.trackedQuests);
    } else {
      toast.warn("You should connect wallet first!");
      console.log("😘 else", wallet);
      const result = await apiCaller.post("users/getMyInfo", {
        wallet: "template",
      });
      console.log("👌", result.data.data);
      await dispatch(setMyInfo({ myInfo: result.data.data }));
      setQuestifyCount(result.data.data.trackedQuests);
      setTetrisCount(result.data.data.tetris.trackedQuests);
    }
  };

  useEffect(() => {
    setInitial();
  }, []);

  useEffect(() => {
    console.log("💕", myInfo);
    try {
      let statusArray = new Array(11).fill(0);
      let myArray: number[][] = [[...Array(4)].fill(0), [...Array(8)].fill(0)];
      for (let i = 0; i < 12; i++) {
        if (i < 4) {
          myInfo?.receivedQuests[i] == 1
            ? (statusArray[i] = 2)
            : myInfo?.trackedQuests[i] == QUESTIFY_QUESTS[i].untilClaim
            ? (statusArray[i] = 1)
            : (statusArray[i] = 0);
        } else
          myInfo.tetris?.receivedQuests[i - 4] == 1
            ? (statusArray[i] = 2)
            : myInfo.tetris?.trackedQuests[i - 4] ==
              QUESTIFY_QUESTS[i].untilClaim
            ? (statusArray[i] = 1)
            : (statusArray[i] = 0);
      }

      console.log("🤣", statusArray);

      setQuestStatus(statusArray);
    } catch (error) {}
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
            QUESTIFY_QUESTS.slice(0, 4).map((quest, index) => (
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
            QUESTIFY_QUESTS.slice(4).map((quest, index) => (
              <QuestBox
                key={index}
                {...quest}
                index={index + 4}
                active={questStatus[index + 4]}
              />
            ))}
        </div>
      </div>
      <Modal open={modalOpen} onClose={handleClose}>
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
              {QUESTIFY_QUESTS[clickedCardNum].title} (
              {clickedCardNum < 4
                ? questifyCount[clickedCardNum]
                : tetrisCount[clickedCardNum - 4]}
              /{QUESTIFY_QUESTS[clickedCardNum].untilClaim})
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
                  if (clickedCardNum < 4) {
                    const result = await apiCaller.post("users/receiveQuest", {
                      wallet: localStorage.getItem("connectedAddress"),
                      index: clickedCardNum,
                    });
                    dispatch(setMyInfo({ myInfo: result.data.existingUser }));
                    // console.log("😁😁", result);
                    dispatch(
                      setMyXP({ myXP: result.data.existingUser?.totalXP })
                    );
                  } else {
                    const result = await apiCaller.post(
                      "tetrises/receiveQuest",
                      {
                        wallet: localStorage.getItem("connectedAddress"),
                        index: clickedCardNum,
                      }
                    );
                    dispatch(setMyInfo({ myInfo: result.data.existingUser }));
                    // console.log("😁😁", result);
                    dispatch(
                      setMyXP({ myXP: result.data.existingUser?.totalXP })
                    );
                  }
                }}
              >
                Claim quests
              </Button>
            )}
            {questStatus[clickedCardNum] == 0 &&
            (clickedCardNum == 2 || clickedCardNum == 3) ? (
              <Button
                size="small"
                color="success"
                variant="contained"
                sx={{ marginRight: "10px" }}
                onClick={() => {
                  dispatch(setDepositModalOpen({ depositModalOpen: true }));
                  dispatch(setModalOpen({ modalOpen: false }));
                }}
              >
                Deposit
              </Button>
            ) : (
              questStatus[clickedCardNum] == 0 && (
                <Button
                  size="small"
                  color="success"
                  variant="contained"
                  sx={{ marginRight: "10px" }}
                  onClick={() => {
                    window.open(
                      "https://questify-game-tetrisk-testing.web.app",
                      "_blank"
                    );
                  }}
                >
                  Play
                </Button>
              )
            )}
          </CardActions>
        </Card>
      </Modal>
    </BorderPanel>
  );
};

export default QuestBanner;
