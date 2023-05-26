import "font-awesome/css/font-awesome.min.css";

export interface PrimaryButtonProps {
  caption: string;
  icon?: string;
  bordered?: boolean;
  onClick: any;
  styles?: string;
  disabled?: boolean;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <button
      className={`solarity-button font-medium p-[16px] sm:p-[12px] rounded-[22px]  text-gray-200 w-[100%] h-[50px] text-[16px] sm:text-[18px] text-center tracking-wider inline-flex items-center justify-center ${
        props.bordered ? "text-lightprimary border-lightprimary border-2" : ""
      } ${
        props.disabled
          ? "bg-[#1d1e20] button-disabled"
          : "bg-primary hover:shadow-[0_0_20px_-5px_#29b080]"
      } ${props.styles}`}
      onClick={props.disabled ? null : props.onClick}
    >
      {props.icon ? <i className="fa fa-chrome fa-lg pr-[10px]"></i> : ""}
      <span>{props.caption}</span>
    </button>
  );
};

export default PrimaryButton;
