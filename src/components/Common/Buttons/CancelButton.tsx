import 'font-awesome/css/font-awesome.min.css'

export interface CancelButtonProps {
    onClick: any
    styles?: string
}

const CancelButton = (props: CancelButtonProps) => {
    return (
        <button
            className={`back-button font-medium py-[22px] px-[22px] rounded-[22px] text-[#f3f3f3] w-[100%] h-[62px] text-[16px] sm:text-[16px] text-center tracking-wider inline-flex items-center justify-center text-lightprimary border-[#272829] border-2 ${props.styles} bg-[#1d1e20]`}
            onClick={props.onClick}
        >
            Cancel
        </button>
    )
}

export default CancelButton
