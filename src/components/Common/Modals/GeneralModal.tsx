import { FC, Fragment } from "react";
import { Button, CancelButton, PrimaryButton } from "../Buttons";
import Input from "../Forms/Input";

const GeneralModal: FC<{
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  subtitle?: string;
  content: any;
}> = ({ open, onClose, onConfirm, title, subtitle, content }) => {
  return (
    <>
      {open ? (
        <>
          <div
            className="justify-center items-center hidden sm:flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[120] outline-none focus:outline-none"
            onClick={onClose}
          >
            <div
              className="relative w-[640px] my-6 mx-auto max-w-[640px]"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {/*content*/}
              <div className=" rounded-[30px] shadow-lg relative flex flex-col w-full bg-[#141416] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between pt-5 pl-8 pr-6 rounded-t">
                  <h3 className="pl-2 text-[36px]  text-gray-200 font-medium tracking-[0.02em]">
                    {title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent  text-red float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="bg-transparent text-grey h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="flex items-start justify-between pt-1 pl-8 pr-6 rounded-t">
                  <h3 className="pl-2 text-[16px]  text-gray-200 font-medium tracking-[0.02em]">
                    {subtitle}
                  </h3>
                </div>
                <div className="relative p-8 flex-auto">
                  {/*body*/}
                  <div>{content}</div>
                  {/*footer*/}
                  <div className="w-full py-[32px] lg:py-8 flex-auto flex items-center justify-end">
                    <div className="inline-block w-[30%] pr-2">
                      <CancelButton onClick={onClose} styles="rounded-[15px]" />
                    </div>
                    <div className="inline-block w-[40%] pl-2">
                      <Button
                        caption="Start"
                        icon=""
                        bordered={false}
                        onClick={onConfirm}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black/70 backdrop-blur-sm fixed inset-0 z-[100]"></div>
        </>
      ) : null}
    </>
  );
};

export default GeneralModal;
