import React, { useState } from "react";

type InputType = {
  caption: String;
  value: string;
  setValue: Function;
  disabled: Boolean;
};

const Input = (props: InputType) => {
  const [classFocus, setClassFocus] = useState(" text-gray-200/60");
  const [classBorder, setClassBorder] = useState("border-white/10");

  const focusInput = () => {
    setClassFocus("top-[-15%] !text-[12px] text-primary");
    setClassBorder("border-primary");
  };

  const unFocusInput = () => {
    if (!props.value) {
      setClassFocus(" text-gray-200/60");
      setClassBorder("border-white/10");
    }
  };

  return (
    <div
      className={`w-full relative flex items-center rounded-[18px] border-[1.5px] py-1 px-2 ${classBorder}`}
    >
      <span
        className={`absolute bg-[#141416] text-[18px] font-[200] px-2 tracking-[0.02rem] z-10 ${classFocus}`}
      >
        {props.caption}
      </span>
      <input
        className="appearance-none font-[200] text-[18px] tracking-[0.02rem] bg-transparent z-50 w-full h-[48px]  text-gray-200/60 mr-3 py-1 px-2 leading-tight"
        onFocus={focusInput}
        onBlur={unFocusInput}
        onChange={(e) => {
          props.setValue(e.target.value);
        }}
        value={props.value}
        autoFocus={true}
      />
    </div>
  );
};

export default Input;
