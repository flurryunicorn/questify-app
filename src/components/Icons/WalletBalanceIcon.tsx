
const WalletBalanceIcon = ({ kind, balance, address, badge, onClick }) => {
    return (
        <div
            className="flex
                        lg:flex-col md:flex-row sm:flex-row xs:flow-row items-center
                        bg-[#181818] sm:rounded-5 xs:rounded-4 m-[5px] sm:p-4 xs:p-[11px] content-between rounded-[20px] cursor-pointer"
            onClick={onClick}
        >
            <div
                className="flex flex-row justify-start text-[#929298] font-400 min-w-[24px]
                            custom-2xl:text-[16px] xl:text-[16px] sm:text-[14px] xs:text-[14px] items-center"
            >
                <img src={badge} width={24} height={24} alt="wallet icon" />
                <div className="ml-[10px] lg:block md:hidden sm:hidden xs:hidden">
                    {address}
                </div>
            </div>

            <div className="flex flex-row lg:mt-[10px] md:mt-[0px] sm:mt-[0px] xs:mt-[0px] lg:ml-[0px] md:ml-[8px] sm:ml-[8px] xs:ml-[8px]">
                <div className="text-[#f3f3f3] font-500 custom-2xl:text-[20px] xl:text-[20px] lg-[20px] sm:text-[16px] xs:text-[14px]">
                    {balance}
                </div>
                <div className="text-[#929298] font-500 custom-2xl:text-[20px] xl:text-[20px] lg-[20px] sm:text-[16px] xs:text-[14px] ml-[5px]">
                    {kind}
                </div>
            </div>
        </div>
    )
}

export default WalletBalanceIcon
