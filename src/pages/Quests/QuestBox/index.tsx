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

  return (
    <div>
      <div
        className={`w-[180px] col-span-1 rounded-[20px] bg-[#030A13] flex flex-col justify-between cursor-pointer
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
        onClick={async () => {
          dispatch(setClickedCardNum({ clickedCardNum: props.index }));
          console.log("🤐", props.index);
          handleOpen();
        }}
      >
        <div className="relative flex justify-between">
          <img
            src={props.thumbnail}
            className="rounded-[20px]"
            width={180}
            height={90}
            alt="thumbnail"
          />
          <div className="absolute top-[50px] bottom-0 left-0 right-0 rounded-[10px] linearGradient"></div>
          <div className="absolute left-[12px] bottom-[4px] right-[12px] h-[38px] flex">
            <div className="text-white text-[16px] flex items-center pl-2">
              {props.title}
            </div>
          </div>
        </div>
        <div className="px-[20px] py-[8px] mb-2 flex flex-col justify-between">
          <div className="text-[#F3F3F3] text-[14px] mb-4">
            {props.subTitle}:&nbsp;
            <span className="text-[#929298]">
              {minifyString(props.description, 20)}
            </span>
          </div>
          <div className="flex w-full justify-center bottom-1">
            {activeState !== 2 ? (
              <div className="flex items-center gap-2 ">
                <img
                  src={props.icon}
                  className="h-[16px] rounded-full"
                  alt="icon"
                  width={16}
                  height={16}
                />
                <div className="text-[#F3F3F3] text-[18px]">{props.amount}</div>
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

export default QuestBox;
