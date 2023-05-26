import React from "react";
import { SmallButton } from "../../../components/Common/Buttons";

export type SliderType = {
  title: string;
  backgroundImage: string;
  content: any;
  index?: number;
  type?: string;
  button?: string;
  path?: string;
};

const BannerSlide = (props: SliderType) => {
  return (
    <div className="relative w-full h-[362px] min-h-[362px]">
      <img
        src={props.backgroundImage}
        className="min-h-[362]"
        alt={props.title}
      />
      <div
        className={` absolute top-4 md:top-6 left-6 px-[24px] md:px-[52px] w-[300px] md:w-[513px] pt-[40px] pb-7 text-left`}
        style={{ backgroundColor: "rgba(13, 13, 13, 0.7)" }}
      >
        <h2 className="text-[25px] font-[700]  text-gray-200 pb-4">
          {props.title}
        </h2>
        <div
          className={`text-[15px] font-[500] text-[#A29999] ${
            props.button ? "pb-4" : "pb-12"
          }`}
        >
          {props.content}
        </div>
        {props.button && (
          <SmallButton caption={props.button} onClick={() => {}} />
        )}
      </div>
    </div>
  );
};

export default BannerSlide;
