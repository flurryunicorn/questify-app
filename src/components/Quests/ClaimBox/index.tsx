import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { minifyString } from "../../../utils";
import {
  setModalOpen,
  setClickedCardNum,
} from "../../../redux/slices/tetrisSlice";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { BorderPanel } from "../../Common/Panels";
import { Button, styled } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export type ClaimBoxType = {
  active: number;
  amount: number;
  title: string;
  description: string;
  category?: string;
  thumbnail: string;
};

let theme = createTheme({
  shape: {
    borderRadius: 10,
  },
});

const ClaimBox = (props: ClaimBoxType) => {
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

  return (
    <div
      className={`w-[200px] col-span-1  bg-[#030A13] flex flex-col justify-between cursor-pointer border-2 border-blue-400 rounded-2xl`}
    >
      <div className="relative flex justify-center pt-1 border-b-2 rounded-t-2xl border-blue-400 bg-gradient-to-b from-green-900">
        <img src={props.thumbnail} width={70} alt="thumbnail" />
        <div className="absolute top-[50px] bottom-0 left-0 right-0 rounded-[10px] bg-green linearGradient"></div>
        <div className="absolute left-[12px] bottom-[4px] right-[12px] flex">
          <div className="text-[14px] flex items-center pl-2">
            Claim your&nbsp;
            <span className="text-green-500">{props.title}</span>
          </div>
        </div>
      </div>
      <div className="px-[20px] py-[8px] mb-2 flex flex-col justify-between">
        <div className="text-blue-500 font-bold text-[13px]">Congrats!</div>
        <div className="text-[#929298] text-xs ">
          {minifyString(props.description, 50)}
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex w-full justify-center bottom-1">
            {activeState !== 2 ? (
              <div className="flex flex-row items-center gap-2 ">
                <img
                  src="/images/quests/xp.png"
                  className="h-[16px] rounded-full"
                  alt="icon"
                  width={16}
                  height={16}
                />
                <div className="text-[#F3F3F3] text-[16px]">{props.amount}</div>
                <div>
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      size="small"
                      style={{ textTransform: "none", padding: "0px" }}
                      onClick={() => {
                        window.open(
                          "https://questify-game-tetrisk-testing.web.app",
                          "_blank"
                        );
                      }}
                    >
                      Claim
                    </Button>
                  </ThemeProvider>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <CheckCircleOutlineIcon color="success" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimBox;
