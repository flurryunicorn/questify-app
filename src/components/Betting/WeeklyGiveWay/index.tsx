import { BorderPanel, GeneralPanel } from "../../../components/Common/Panels";
import { useNavigate } from "react-router-dom";
import { BiPlus } from "react-icons/bi";

const WeeklyGiveWay = () => {
  const navigate = useNavigate();

  return (
    <BorderPanel>
      <div className="flex w-full px-4 py-2 bg-sky-600/5 border-[#132236] border-b  ">
        <div className="font-bold text-sm  text-gray-200 ">Weekly Giveaway</div>
      </div>

      <div className="flex flex-row mx-4 overflow-x">
        <div className="mt-[18px] w-[230px] mb-[18px] relative  rounded-lg border border-[#132236] justify-between">
          <div className="flex justify-center flex-col place-content-center">
            <div className="flex flex-col items-center justify-center h-[120px] top-[8px] bg-cyan-400/10 rounded-t-lg place-items-center">
              <div className="flex justify-center">
                <img
                  src={`/images/betting/tile.svg`}
                  alt="betting"
                  className="mt-[12px] w-[40%]"
                />
              </div>
              <div
                className="inline-block justify-center items-center rounded-full
                                 cursor-pointer px-[13px] py-1.5 
                              border border-[#29B080]  text-emerald-300 bg-emerald-300/20 font-bold mx-2 my-1 
                              hover:border-primary hover:opacity-[90%]"
                onClick={() => {
                  navigate("/subbetting");
                }}
              >
                <p className="text-[12px]">1000 SEI</p>
              </div>
            </div>

            <div className="border-[#132236] border-b-[1px] flex flex-row py-2 justify-between ">
              <div
                className="flex justify-center items-center rounded-[40px] border-[1.2px]
                                font-[500] text-[14px]  cursor-pointer px-[13px] py-[-5px]
                            border-[#29B080] text-[#29B080] bg-[#162724] mx-2
                              hover:border-primary"
              >
                <p className="text-[10px]">Opened</p>
              </div>
              <div className="mx-2 text-[10px]">25/25 slots</div>
            </div>
            <div className="border-[#132236] border-b-[1px] flex flex-row py-2 justify-between text-[10px]">
              <div className="mx-2">Min.Entry price</div>
              <div className="mx-2">0.5 SEI </div>
            </div>
            <div className="border-[#132236] flex flex-row py-2 justify-between text-[10px]">
              <div className="mx-2"> End in </div>
              <div className="mx-2"> 00:02:52 </div>
            </div>
          </div>
        </div>

        <div className="mt-[18px] mx-5 bg-green-400/5 mb-[18px] relative w-[230px] rounded-xl border border-dotted border-[#29B080] pb-[20px]  flex justify-center items-center">
          <div className="my-[20%] justify-center flex items-center flex-col">
            <div className="flex justify-center border-green-400 my-2 text-green-500 items-center  border rounded-full  h-12 w-12 bg-emerald-600/20 flex-col cursor-pointer">
              <BiPlus />
            </div>
            <div className="text-center lg:text-[16px] md:text-[14px] sm:text-[14px] text-[12px] ]">
              More Coming Soon
            </div>
          </div>
        </div>
      </div>
    </BorderPanel>
  );
};

export default WeeklyGiveWay;
