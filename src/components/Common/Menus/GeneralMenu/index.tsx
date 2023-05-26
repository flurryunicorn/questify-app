import React, { useState } from "react";
import { Lock } from "../../../Icons";
export type MenuItemType = {
  title: string;
  lockFlag: boolean;
};
type MenuType = {
  menuItems: MenuItemType[];
};

const GeneralMenu = (props: MenuType) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="flex gap-4 border-b mx-4 border-[#132236] cursor-pointer">
      {props.menuItems.map((menuItem, index) => (
        <div
          key={index}
          className={`flex items-center hover:opacity-90 text-[14px]  text-emerald-400 ${
            index == activeIndex
              ? "opacity-90 border-b-2 border-emerald-300"
              : "opacity-60"
          }`}
        >
          {menuItem.title}
          {menuItem.lockFlag && (
            <div className="">
              <Lock />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GeneralMenu;
