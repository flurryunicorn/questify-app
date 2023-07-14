import React, { useEffect, useState } from "react";
import { minifyString } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
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

import {
  setModalOpen,
  setClickedCardNum,
} from "../../../redux/slices/tetrisSlice";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { BorderPanel } from "../../Common/Panels";
import { Button, styled } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const QuestBox = (props: QuestBoxType) => {
  const [activeState, setActiveState] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const dispatch = useDispatch();

  const propsActiveState = props.active || 0;
  const clickedCardNum = useSelector((state: any) => {
    clickedCardNum: state.tetris.clickedCardNum;
  });

  useEffect(() => {
    setActiveState(propsActiveState);
  }, [propsActiveState]);

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  const { modalOpen } = useSelector((state: any) => ({
    modalOpen: state.tetris.modalOpen,
  }));
  const handleOpen = () => {
    dispatch(setModalOpen({ modalOpen: true }));
  };

  useEffect(() => {
    console.log(open);
  }, [open]);

  let theme = createTheme({
    shape: {
      borderRadius: 10,
    },
  });

  return (
    <BorderPanel>
      <div
        className={`w-[170px] col-span-1 rounded-2xl  flex flex-col justify-between cursor-pointer
        ${
          activeState === 2
            ? "active_card"
            : activeState === 1
            ? "active_card_used"
            : ""
        }
        ${isHovered ? "hover-card" : ""}`}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        key={props.index}
        // onClick={async () => {
        //   dispatch(setClickedCardNum({ clickedCardNum: props.index }));
        //   console.log("🤐", props.index);
        //   handleOpen();
        // }}
      >
        <div className="relative flex justify-between w-full border-b px-6 py-2 border-[#132236] rounded-t-2xl bg-gradient-to-b from-transparent to-black-70 backdrop-blur">
          {props.title}
        </div>
        <div className="px-2 py-3 flex flex-col justify-between bg-[#040A12] rounded-b-2xl">
          <div className="text-[#F3F3F3] text-[13px] mb-4">
            {props.untilClaim}/{props.untilClaim}:&nbsp;
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
                    {activeState !== 3 && activeState !== 2 ? (
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
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        style={{ textTransform: "none", padding: "0px" }}
                        onClick={() => {
                          console.log("Claim");
                        }}
                      >
                        Claim
                      </Button>
                    )}
                  </ThemeProvider>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </BorderPanel>
  );
};

export default QuestBox;
