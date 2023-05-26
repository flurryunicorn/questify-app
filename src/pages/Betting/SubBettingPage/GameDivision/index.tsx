import React from "react";
import { RoundButton } from "../../../../components/Common/Buttons";

const GameDivision = () => {
  return (
    <div className="mt-14 float-right">
      <div className="flex mb-1 gap-4">
        <div className="text-[16px]  text-gray-200 flex items-center">TYPE</div>
        <div className="flex gap-2">
          <RoundButton caption="P2P" styles="border-[#73C0DB]" />
          <RoundButton caption="TACTICS" styles="border-[#73C0DB]" />
          <RoundButton caption="ACTION" styles="border-[#73C0DB]" />
        </div>
      </div>
      <div className="flex mb-1 gap-4">
        <div className="text-[16px]  text-gray-200 flex items-center">P2E</div>
        <div className="flex gap-2">
          <RoundButton caption="NFT" styles="border-[#DB7373]" />
          <RoundButton caption="CRYPTO" styles="border-[#DB7373]" />
        </div>
      </div>
      <div className="flex mb-1 gap-4">
        <div className="text-[16px]  text-gray-200 flex items-center">
          NETWORK
        </div>
        <div className="flex gap-2">
          <RoundButton caption="SOL" styles="border-[#DBD173]" />
          <RoundButton caption="ETH" styles="border-[#DBD173]" />
        </div>
      </div>
    </div>
  );
};

export default GameDivision;
