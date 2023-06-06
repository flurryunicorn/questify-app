import { BorderPanel } from "../../../components/Common/Panels";
import { useEffect, useState } from "react";
import { setMyXP } from "../../../redux/slices/tetrisSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setMyInfo } from "../../../redux/slices/tetrisSlice";
import { apiCaller } from "../../../utils/fetcher";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { LoadingButton } from "@mui/lab";

const style = {
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

const QuestProgress = () => {
  const dispatch = useDispatch();
  const [lvlUp, setLvlup] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [total, setTotal] = useState(500);
  const [w, setW] = useState(0);
  const [loadingButton, setLoadingButton] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = async () => {
    setModalOpen(false);
    setLoadingButton(false);
  };

  const { myInfo } = useSelector((state: any) => ({
    myInfo: state.tetris.myInfo,
  }));

  const { myXP } = useSelector((state: any) => ({
    myXP: state.tetris.myXP,
  }));

  useEffect(() => {
    const lvl = Number(myXP < 500 ? 1 : Math.floor(Math.log2(myXP / 500)) + 2);
    setLvlup(lvl !== myInfo.level);
    console.log();
    setTotal(500 * Math.pow(2, myInfo.level - 1));
    setW((Number(myXP) * 100) / Number(total));
    console.log("lvl", lvl, "myInfo.level", myInfo.level);
  }, [myInfo]);

  console.log(Number(myXP < 500 ? 1 : Math.floor(Math.log2(myXP / 500)) + 2));
  console.log(lvlUp);

  useEffect(() => {
    setW((Number(myXP) * 100) / Number(total));
  }, [total]);

  const [progressValue, setProgressValue] = useState(Number(myXP));
  const { rewardModalOpen } = useSelector((state: any) => ({
    rewardModalOpen: state.tetris.rewardModalOpen,
  }));

  return (
    <BorderPanel>
      <h1 className="text-[20px] mx-4 my-3 text-md  text-gray-200">
        Quest Progress
      </h1>
      <div className="flex flex-row justify-center mb-5">
        <div className="xp_icon">
          <img
            src="/images/quests/Avatar.png"
            width="100px"
            className=" rounded-lg"
          />
        </div>
        <div className="mt-5">
          <div className="parent_div lg:w-[14vw] w-[60vw]">
            {lvlUp ? (
              <div
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <div className="progress_icon animated"></div>
                <div className="progress_lvl animatedTxt">{myInfo.level}</div>
              </div>
            ) : (
              <>
                <div className="progress_icon"></div>
                <div className="progress_lvl">{myInfo.level}</div>
              </>
            )}

            <div className="child_div" style={{ width: `${w}%` }}></div>
            <span className="progress_text">{`${myXP.toString()}/${total}`}</span>
          </div>
        </div>
      </div>
      <Modal open={modalOpen} onClose={handleClose}>
        <Card sx={style}>
          <CardMedia
            style={{ background: "white" }}
            component="img"
            height="140"
            image="/images/quests/Reward.jpg"
          />
          <CardActions
            sx={{
              background: "black",
              color: "white",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <div>
              <LoadingButton
                size="small"
                color="success"
                variant="contained"
                loading={loadingButton}
                sx={{ marginRight: "10px" }}
                onClick={async () => {
                  setLoadingButton(true);
                  const result = await apiCaller.post("users/levelUp", {
                    wallet: localStorage.getItem("connectedAddress"),
                  });
                  dispatch(setMyInfo({ myInfo: result.data.existingUser }));
                  setModalOpen(false);
                  setLvlup(false);
                  toast.info(`You've got ${3 * (myInfo.level - 1)} balance!`);
                }}
              >
                Claim Reward
              </LoadingButton>
            </div>
          </CardActions>
        </Card>
      </Modal>
    </BorderPanel>
  );
};

export default QuestProgress;
