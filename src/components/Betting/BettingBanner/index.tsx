import React, { useState } from "react";

import { SmallButton } from "../../../components/Common/Buttons";
import { WEEK_GAMES } from "../../../data";
import { useNavigate } from "react-router-dom";
export type BettingBannerType = {
  title: string;
  backgroundImage: string;
  content: any;
  index?: number;
  button?: string;
  path?: string;
};

const BettingBanner = (props: BettingBannerType) => {
  const [active, setActive] = useState(0);
  const gotoPath = () => {};

  const navigate = useNavigate();

  return (
    <div className="relative min-h-[354px] rounded-lg overflow-hidden">
      <img
        src={props.backgroundImage}
        className="min-h-[354px] rounded-lg"
        alt={props.title}
      />
      <div className="absolute bg-black/20  bg-gradient-to-br from-emerald-500/40 to-cyan-500/20 bottom-0 left-0 w-full h-full rounded-lg"></div>

      <div className="absolute bg-black/40 bottom-0 left-0 w-full h-[300px] shadow-xl md:backdrop-blur flex md:flex-row flex-col">
        <div className="ml-[20px] lg:mt-[0] mt-[20px]">
          <h2
            className="text-[30px] font-[700]  text-gray-200 pb-0"
            style={{ textShadow: "0 0 30px #9370DB" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="w-[34px]">
                <img
                  src="/images/betting/illustration-hero.svg"
                  alt="avatar"
                  style={{ marginTop: "0px", paddingRight: "5px" }}
                  width={34}
                  height={34}
                  className="rounded-lg w-[34px] h-[34px]"
                />
              </div>
              {props.title}
            </div>
          </h2>
          <div className="w-[60%]">
            <p
              className={`text-[15px] font-[500] text-slate-100 mt-2 ${
                props.button ? "pb-5" : "pb-12"
              }`}
              style={{
                textShadow: "0 0 1px #9370DB",
                marginTop: "0",
                marginBottom: "-18%",
              }}
            >
              {props.content}
            </p>
          </div>
        </div>
        <div className="mt-[20px] mx-[20px]">
          {props.button && (
            <div style={{}}>
              <SmallButton
                caption={props.button}
                onClick={() => navigate("/subbetting")}
              />
            </div>
          )}
        </div>
        {/* <div className='text-[20px] font-[500]  text-gray-200 mt-[-10px]'> */}
        {/* <h3>Games of the week:</h3> */}
        {/* <div className='flex gap-[20px]'>
                        {WEEK_GAMES.map((game, index) => (
                            <div key={index} className={`${index == active ? 'border-[4px] border-primary hover:border-[6px] ' : 'hover:border-[5px]'} rounded-[25px] w-[64px] h-[64px] cursor-pointer`}>
                                <img src={game.bgImg} className='rounded-[25px]' width={64} height={64} />
                            </div>
                        ))}
                    </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default BettingBanner;
