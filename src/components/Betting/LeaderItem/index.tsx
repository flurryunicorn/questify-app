import React from "react";

export type LeaderItemType = {
  avatarUrl: string;
  no: number;
  type: boolean;
  name: string;
  score: number;
};

const LeaderItem = (props: LeaderItemType) => {
  return (
    <div className="flex">
      <div
        className={`mt-[15px] bg-[#272829] border border-[#787878] rounded-[5px] w-[103px] h-[104px]`}
      >
        <div className="rounded-full">
          <div className="flex justify-center mt-[-28px] mb-[6px]">
            <img
              src={props.avatarUrl}
              alt="avatar"
              width={56}
              height={56}
              className="rounded-full w-[56px] h-[56px]"
            />
          </div>
          <div className="text-[14px] text-[#B2B2B2] font-500 flex justify-center">
            {props.name}
          </div>
          <div className="text-[18px]  text-gray-200 font-700 flex justify-center">
            {props.score}
          </div>

          <div className="flex justify-center">
            <div
              className={`mt-[10px] border border-[#406C13] text-[#F9F9F9] text-[14px] rounded-[5px] ${
                props.type ? "px-[19px]" : "px-[12px]"
              } py-[4px]`}
              style={{
                background: "linear-gradient(90deg, #16803C 0%, #59C17E 100%)",
              }}
            >
              {props.type && <span>#</span>}
              {props.no}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderItem;
