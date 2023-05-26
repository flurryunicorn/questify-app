import React from 'react'

const LogoComp = () => {
    return (
        <div className="flex h-full w-full items-center justify-center cursor-pointer">
            <div className="">
                <img
                    src={'/images/logos/logo.svg'}
                // width={60}
                // height={60}
                />
            </div>
            {/* <h1 className="pl-5 pt-1 font-semibold text-[30px] text-[#BCBCBC]">
                QUESTIFY
            </h1> */}
        </div>
    )
}
export default LogoComp
