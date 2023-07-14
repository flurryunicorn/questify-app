import React, { useEffect, useState } from "react";
import { minifyString } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { QUESTIFY_QUESTS } from "../../../data";

import { setMyInfo, setMyXP } from "../../../redux/slices/tetrisSlice";

import { apiCaller } from "../../../utils/fetcher";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { BorderPanel } from "../../Common/Panels";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import { CircularProgress } from "@mui/material";

export type QuestBoxType = {
  index?: number;
  active?: number;
  title: any;
  subTitle: any;
  description: string;
  avatar: string;
  isAvatar?: boolean;
  icon: string;
  amount: number;
  thumbnail?: string;
  onClick?: Function;
  buttonCaption?: string;
  fullDescription?: string;
  untilClaim?: number;
};

const QuestBox = (props: QuestBoxType) => {
  const [activeState, setActiveState] = useState<number>(0);
  const [claimLoading, setClaimLoading] = React.useState(false);

  const dispatch = useDispatch();

  const propsActiveState = props.active || 0;
  const clickedCardNum = useSelector((state: any) => {
    clickedCardNum: state.tetris.clickedCardNum;
  });

  useEffect(() => {
    setActiveState(propsActiveState);
  }, [propsActiveState]);

  const { myInfo } = useSelector((state: any) => ({
    myInfo: state.tetris?.myInfo,
  }));

  const [questifyCount, setQuestifyCount] = useState(new Array(4).fill(0));
  const [tetrisCount, setTetrisCount] = useState(new Array(8).fill(0));

  useEffect(() => {
    if (myInfo.achievedQuests?.questify !== undefined) {
      setQuestifyCount(myInfo.achievedQuests?.questify);
      setTetrisCount(myInfo.achievedQuests?.tetris);
    }
  }, [myInfo]);

  useEffect(() => {
    console.log(open);
  }, [open]);

  let theme = createTheme({
    shape: {
      borderRadius: 10,
    },
  });

  return (
    <div className="mt-4 border-[#132236] bg-[#071018] rounded-2xl border-[2px] w-[174px]">
      <div
        className={`w-[170px] col-span-1 rounded-2xl  flex flex-col justify-between cursor-pointer
        ${
          activeState === 2
            ? "active_card"
            : activeState === 1
            ? "active_card_used"
            : ""
        }
        `}
        key={props.index}
      >
        <div className="relative flex justify-between w-full border-b px-6 py-2 border-[#132236] rounded-t-2xl bg-gradient-to-b from-transparent to-black-70 backdrop-blur">
          {props.title}
        </div>
        <div className="px-2 py-3 flex flex-col justify-between bg-[#040A12] rounded-b-2xl">
          <div className="text-[#F3F3F3] text-[13px] mb-4">
            {Number(props.index) < 4
              ? questifyCount[Number(props.index)]
              : tetrisCount[Number(props.index) - 4]}
            /{QUESTIFY_QUESTS[Number(props.index)].untilClaim}:&nbsp;
            <span className="text-[#929298]">
              {minifyString(props.description, 50)}
            </span>
          </div>
          <div className="flex w-full justify-center bottom-1">
            {activeState == 2 ? (
              <div className="flex items-center">
                <CheckCircleOutlineIcon color="success" />
              </div>
            ) : (
              <div className="flex flex-row gap-4">
                <div className="flex flex-row items-center gap-2">
                  <img
                    src={props.icon}
                    className="h-[16px] rounded-full"
                    alt="icon"
                    width={16}
                    height={16}
                  />
                  <div
                    className="text-[#F3F3F3] text-[16px]"
                    style={{ fontFamily: "PlusJakartaText" }}
                  >
                    {props.amount}
                  </div>
                </div>
                <div>
                  <ThemeProvider theme={theme}>
                    {activeState !== 1 && activeState !== 2 ? (
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        style={{ textTransform: "none", padding: "0px" }}
                        onClick={() => {
                          window.open(
                            "https://questify-game-tetrisk-testing.web.app",
                            "_blank"
                          );
                        }}
                      >
                        Play
                      </Button>
                    ) : (
                      <LoadingButton
                        variant="contained"
                        size="small"
                        color="success"
                        loading={claimLoading}
                        loadingIndicator={
                          <CircularProgress color="success" size={16} />
                        }
                        style={{ textTransform: "none", padding: "0px" }}
                        onClick={async () => {
                          console.log(props.index);
                          setClaimLoading(true);

                          let index = Number(props.index);
                          let result;
                          if (index < 4) {
                            result = await apiCaller.post("users/claimQuest", {
                              wallet: localStorage.getItem("connectedAddress"),
                              index: props.index,
                            });
                          } else {
                            result = await apiCaller.post(
                              "tetrises/claimQuest",
                              {
                                wallet:
                                  localStorage.getItem("connectedAddress"),
                                index: props.index,
                              }
                            );
                          }

                          dispatch(
                            setMyInfo({ myInfo: result.data.existingUser })
                          );
                          // console.log("😁😁", result);
                          dispatch(
                            setMyXP({ myXP: result.data.existingUser?.totalXP })
                          );
                          setClaimLoading(false);
                        }}
                      >
                        Claim
                      </LoadingButton>
                    )}
                  </ThemeProvider>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestBox;
