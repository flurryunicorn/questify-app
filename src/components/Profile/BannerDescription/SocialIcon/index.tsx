type SocialIconProps = {
  onClick?: any
}

const SocialIcon = ({ children, ...props }) => {
  return (
      <div
          className="flex justify-center items-center transition duration-300 w-10 h-10 border-[#272829] border-[1px] hover:border-primary bg-globalBgColor rounded-[12px] mr-4 cursor-pointer"
          onClick={props.onClick}
      >
          {children}
      </div>
  )
}

export default SocialIcon;