import React from "react";

const Layout = (props: {
  children: any;
  banner: any;
}) => {
  return (
    <div className="bg-[#131314] flex sm:flex-row xs:flex-col w-full relative">
      <div className="flex w-full h-full">
        <div
          className={`fixed left-[0px] xs:top-[80px] sm:top-[164px] xl:top-[92px] bottom-0 overflow-y-auto right-0`}
        >
          {props.banner}
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Layout;