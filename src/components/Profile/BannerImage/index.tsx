import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SocialIcon from '../BannerDescription/SocialIcon'

const BannerImage = () => {
    const dispatch = useDispatch()

    const [shareMenuToggle, setShareMenuToggle] = useState(false)
    const [activeRoom, setActiveRoom] = useState(-1)
    const [isIframe, setIsIframe] = useState(false)
    const [path, setPath] = useState('')

    return (
        <div className="w-full relative">
            <div className="rounded-[25px] sm:mt-[0px] xs:mt-[24px] overflow-hidden w-full">
                <img
                    src={
                        '/images/profile/Profile_banner_Konstantin1982.png'
                    }
                    width={1708}
                    height={450}
                    alt="Banner Image"
                />
            </div>
            <div
                className="absolute flex sm:justify-start xs:justify-center w-full
                            custom-2xl:bottom-[-32px] custom-2xl:left-[0px]
                            xl:bottom-[-30px] xl:left-[0px]
                            md:bottom-[-30px] md:left-[0px]
                            sm:bottom-[-30px] sm:left-[0px]
                            xs:bottom-[-30px] xs:left-[0px]"
            >
                <div
                    className="relative custom-2xl:w-[82px] xl:w-[82px] md:w-[110px] sm:w-[100px] xs:w-[100px]
                                rounded-full border-[3px] border-globalBgColor"
                >
                    <img
                        src={
                            '/images/profile/Avatar_Konstantin1982.webp'
                        }
                        className="rounded-full"
                        width={82}
                        height={82}
                        alt="user avatar"
                    />
                    <div
                        className="absolute
                                custom-2xl:right-[0px] custom-2xl:bottom-[0px] custom-2xl:w-[28px]
                                xl:right-[0px] xl:bottom-[0px] xl:w-[26px]
                                md:right-[0px] md:bottom-[0px] md:w-[24px]
                                sm:right-[0px] sm:bottom-[0px] sm:w-[24px]
                                xs:right-[0px] xs:bottom-[0px] xs:w-[24px]"
                    >
                        <img
                            src={'/images/profile/Verified.png'}
                            width={28}
                            height={28}
                            alt="verified badge"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerImage
