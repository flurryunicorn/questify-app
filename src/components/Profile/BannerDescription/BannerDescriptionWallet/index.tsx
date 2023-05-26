import { useEffect, useState } from 'react'
import { TotalBalanceIcon } from '../../../Icons/TotalBalanceIcon'
import WalletBalanceIcon from '../../../Icons/WalletBalanceIcon'

const BannerDescriptionWallet = () => {

    return (
        <div className={`relative w-fit`}>
            <div
                className={`banner-description-wallet flex h-30 lg:w-fit ${ 'md:w-[80vw] sm:w-[77vw]'} 
                          xs:w-[87vw] border-[#272829] relative cursor-pointer
                          bg-[rgba(19,19,20,0.7)]
                          lg:p-[10px] md:p-[5px] sm:p-[5px] xs:p-[5px]
                          custom-2xl:my-0 xl:my-0 lg:my-[30px] md:my-[30px] sm:my-[30px] xs:my-[30px]
                          lg:border-[1px] md:border-x-[0px] md:border-y-[1px] sm:border-x-[0px] sm:border-y-[1px] xs:border-x-[0px] xs:border-y-[1px]
                          lg:rounded-[25px] md:rounded-[0px] sm:rounded-[0px] xs:rounded-[0px]
                          justify-between lg:overflow-y-visible lg:overflow-x-visible
                          md:overflow-y-hidden md:overflow-x-visible sm:overflow-y-hidden sm:overflow-x-visible xs:overflow-y-hidden xs:overflow-x-visible
                          scroll-smooth`}
            >
                <div
                    className="p-4 flex flex-col lg:justify-end lg:justify-items-end
                            md:justify-center sm:justify-center xs:justify-center"
                    onClick={() => {}}
                >
                    <div className="flex flex-row">
                        <div
                            className="text-[#f3f3f3] font-500
                                  custom-2xl:text-[20px] xl:text-[20px] lg:text-[20px] sm:text-[16px] xs:text-[16px]"
                        >
                            {871.18}
                        </div>
                        <div
                            className="text-[#929298] font-500
                                  custom-2xl:text-[20px] xl:text-[20x] lg:text-[20px] sm:text-[16px] xs:text-[16px] ml-[10px]"
                        >
                            XP
                        </div>
                    </div>
                    <div
                        className="custom-2xl:text-[16px] xl:text-3 lg:text-[20px] sm:text-[16px]
                                font-400 text-[#474749]
                                lg:block md:hidden sm:hidden xs:hidden"
                    >
                        Total balance
                    </div>
                    <div
                        className="absolute top-[-15px]
                                lg:block md:hidden sm:hidden xs:hidden"
                    >
                        <TotalBalanceIcon />
                    </div>
                </div>
                <WalletBalanceIcon
                    key={0}
                    kind={'MATIC'}
                    balance={0.024}
                    badge={'/images/wallets/polygon.png'}
                    address={'lz99'}
                    onClick={() => {}}
                />
                <WalletBalanceIcon
                    key={1}
                    kind={'ETH'}
                    balance={0.19}
                    badge={'/images/wallets/ethereum.png'}
                    address={'2x20'}
                    onClick={() => {}}
                />
            </div>
        </div>
    )
}

export default BannerDescriptionWallet
