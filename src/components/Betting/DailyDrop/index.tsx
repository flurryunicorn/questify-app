import React from "react";

export type DailDropType = {
  bgPanel: string;
  curPrice: number;
  unit: string;
  title: string;
  openType: boolean;
  slots: number;
  curSlots: number;
  entryPrice: number;
  endTime: string;
}

const DailyDrop = (props: DailDropType) => {
  return (
    <div className="border border-[#919191] rounded-[15px]">
      <div className="relative">
        <img src={props.bgPanel} alt="background image" className="w-full rounded-t-[15px]"/>
        <div className="flex justify-center">
          <span 
            className="mt-[-35px] h-[28px] px-[16px] py-[2px] border border-[#39B725] rounded-[10px] bg-[rgba(28,25,25,0.9)] text-[16px] font-700"
          >
            {props.curPrice + " " + props.unit}
          </span>
        </div>
      </div>
      <div className="text-[15px] font-700 border-b border-b-[#919191] text-center">{props.title} Daily Drop</div>
      <div className="text-[12px] font-500 border-b border-b-[#919191] px-[16px] py-[2px] flex justify-between">
        <span className="px-[8px] text-[#73DBC2] border border-[#73DBC2] bg-[#162724] rounded-full">
          Opened
        </span>
        <span className="text-[12px] flex items-center">
          {props.curSlots + '/' + props.slots} Slots
        </span>
      </div>
      <div className="text-[12px] font-500 border-b border-b-[#919191] px-[16px] py-[2px] flex justify-between">
        <span className="text-[12px] flex items-center">
          Min, Entry price
        </span>
        <span className="text-[12px] flex items-center">
          {props.curPrice}
        </span>
      </div>
      <div className="text-[12px] font-500 px-[16px] py-[2px] flex justify-between">
        <span className="text-[12px] flex items-center">
          End in
        </span>
        <span className="text-[12px] flex items-center">
          {props.endTime}
        </span>
      </div>
    </div>
  );
}

export default DailyDrop;