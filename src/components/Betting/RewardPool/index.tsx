import { BorderPanel } from "../../Common/Panels";
import GeneralMenu from "../../Common/Menus/GeneralMenu";
import { SEASON_MENUITEMS } from "../../../data";

const RewardPool = () => {
  return (
    <BorderPanel style="mt-[12px] relative">
      <h1 className="text-[20px] mx-4 my-2 text-gray-100">Reward Pool</h1>
      <GeneralMenu menuItems={SEASON_MENUITEMS} />
      <div className=" rounded-[12px]  p-[10px]">
        <h2 className="text-[15px] font-500  text-gray-200">
          Questify First Missions
        </h2>
        <p className="text-[14px] font-500 my-3  text-gray-300 pb-4">
          Go to your profile, complete your quests and get access to the SEI
          Battle Pass, get loot boxes and win NFTs and Tokens from all the
          ecosystem! Unlocked on Mainnet
        </p>
        <div className="m-[-12px]">
          <img src={"/images/betting/Group1.png"} />
        </div>
      </div>
    </BorderPanel>
  );
};

export default RewardPool;
