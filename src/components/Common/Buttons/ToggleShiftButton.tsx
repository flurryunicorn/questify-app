import { LeftArrow, RightArrow } from "../../Icons";

const ToggleShowButton = (props) => {
  return (
      <div
          className={`cursor-pointer w-[28px] h-[28px] rounded-[5px] border-[#272829] border-[2px] flex items-center justify-center bg-globalBgColor
                      absolute ${
                          props.toggle ? 'right-[-154px]' : 'right-[-14px]'
                      } top-[36px] z-[999]`}
          onClick={props.onClick}
      >
          {props.toggle ? <LeftArrow /> : <RightArrow />}
      </div>
  )
}

export default ToggleShowButton;