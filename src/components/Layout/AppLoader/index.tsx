import Image from 'next/image'
import { RootStateOrAny, useSelector } from 'react-redux'

const AppLoader = () => {
    const { appLoading } = useSelector((state: RootStateOrAny) => state.common)

    if (!appLoading) {
        return <></>
    }

    return (
        <div className="fixed z-[1000000000] h-[100vh] w-[100vw] bg-black/80 top-0 bottom-0">
            <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
                <div className="flex flex-col items-center justify-center">
                    <div className="h-16 w-16 animate-spin">
                        <img src="/favicon.png" width={100} height={100} />
                    </div>
                    <span className="text-gray-300">LOADING</span>
                </div>
            </div>
        </div>
    )
}

export default AppLoader
