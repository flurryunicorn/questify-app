import React from 'react'
import { LeftArrow, RightArrow } from '../../Icons'

export type SwitchProps = {
    onRightArrowClick: () => void
    onLeftArrowClick: () => void
}

function Switch(props: SwitchProps) {
    return (
        <div className="flex w-[96px] h-[70px] pt-[10px] float-right">
            <div className="flex-1">
                <div
                    className={`flex cursor-pointer w-[40px] h-[40px] rounded-[12px] border-[#272829] border-[1px] items-center justify-center bg-globalBgColor
                        absolute hover:border-primary`}
                    onClick={props.onLeftArrowClick}
                >
                    <LeftArrow />
                </div>
            </div>
            <div className="flex-1">
                <div
                    className={`flex cursor-pointer w-[40px] h-[40px] rounded-[12px] border-[#272829] border-[1px] items-center justify-center bg-globalBgColor
                        absolute hover:border-primary`}
                    onClick={props.onRightArrowClick}
                >
                    <RightArrow />
                </div>
            </div>
        </div>
    )
}

export default Switch
