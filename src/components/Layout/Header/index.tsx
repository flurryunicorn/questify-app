import React, { useContext, useEffect, useState } from "react";
import { HeaderMenuTitles } from "../../../data";
import { WalletWindowKey } from "@sei-js/core";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setLeaderboard,
  setMyBalance,
} from "../../../redux/slices/tetrisSlice";
import {
  WalletConnectButton,
  SeiWalletContext,
  useWallet,
  useSigningClient,
  useQueryClient,
} from "@sei-js/react";
import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { apiCaller } from "../../../utils/fetcher";
import LogoComp from "../LogoComp";
import { SmallButton } from "../../Common/Buttons";
import { PrimaryButton } from "../../Common/Buttons";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

import HeaderMenuItem from "./HeaderMenuItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const isSmallDevice = window.matchMedia("(max-width: 600px)").matches;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { supportedWallets, connect, disconnect, installedWallets } =
    useContext(SeiWalletContext);
  const { connectedWallet, offlineSigner, accounts } = useWallet();
  const [active, setActive] = useState(0);

  const [connected, setConnected] = useState(false);
  const [level, setLevel] = useState(1);
  const [betAmount, setBetAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [claimAmount, setClaimAmount] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [sending, setSending] = useState(false);
  const { signingClient } = useSigningClient();
  const { queryClient } = useQueryClient();
  const [myAddress, setMyAddress] = useState("");

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();

  // const buttonSx = {
  //   ...(success && {
  //     bgcolor: green[500],
  //     "&:hover": {
  //       bgcolor: green[700],
  //     },
  //   }),
  // };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const connected = localStorage.getItem(
      "connectedWallet"
    ) as WalletWindowKey;
    if (connected) {
      connect(connected);
    }
  }, []);

  console.log("asdfasdfa", connected);

  const { balance } = useSelector((state: any) => ({
    balance: state.tetris.balance,
  }));

  useEffect(() => {
    localStorage.setItem("betAmount", betAmount);
  }, [betAmount]);

  const getBalance = async () => {
    if (accounts.length > 0 && !!queryClient) {
      setConnected(true);
      const { balances } = await queryClient.cosmos.bank.v1beta1.allBalances({
        address: accounts[0].address,
      });
      const amount = balances.find((balance) => {
        return balance.denom === "usei";
      });
      if (amount) setCurrentAmount(Number(amount.amount) / 1e6);
    } else {
      setConnected(false);
    }
  };

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 4,
    fontFamily: "IBMPlexMono-Regular",
    p: 4,
  };

  const sendToken = async (amount: number) => {
    if (!signingClient || !accounts) {
      console.log("Wallet is not connected");
      return;
    }
    if (sending) {
      toast.warn("Wait");
      return;
    }
    setSending(true);
    const fee = calculateFee(150000, GasPrice.fromString("3750usei"));
    const transferAmount = { amount: (amount * 1e6).toString(), denom: "usei" };
    console.log("here");

    try {
      const sendResponse = await signingClient.sendTokens(
        accounts[0].address,
        "sei10cs7ddu93ge6kwfllm24cm20h4j4vx00sfaqh7",
        [transferAmount],
        fee
      );
      console.log("sendResponse", sendResponse);
      if (sendResponse.transactionHash) {
        localStorage.setItem("txHash", sendResponse.transactionHash);

        try {
          const result = await apiCaller.post("tetrises/deposit", {
            wallet: accounts[0].address,
            txHash: sendResponse.transactionHash,
            amount: amount,
          });
          console.log(result.data);
          dispatch(
            setMyBalance({ balance: result.data.existingUser.totalBalance })
          );
          handleClose();
          setDepositAmount(0);
        } catch (err: any) {
          // if (err.response.data.message == "Rate limit") {
          //   alert("Rate limit");
          // }
          throw new Error();
        }
      } else {
        throw new Error();
      }
      getBalance();
      setSending(false);
      return true;
    } catch (err) {
      console.log("Error occurred in sending token", err);
      localStorage.removeItem("txHash");
      setSending(false);
      return false;
    }
  };

  const getMyInfo = async (wallet: string) => {
    if (accounts && accounts.length) {
      var result = await apiCaller.post("tetrises/getMyInfo", {
        wallet,
      });
      console.log("ssdfd", result.data.data.totalBalance);
      dispatch(setMyBalance({ balance: result.data.data.totalBalance }));
    }
  };

  useEffect(() => {
    if (connectedWallet) {
      localStorage.setItem("connectedWallet", connectedWallet);
    } else {
      localStorage.removeItem("connectedWallet");
    }
  }, [connectedWallet]);

  useEffect(() => {
    getBalance();
    if (accounts && accounts.length) {
      getMyInfo(accounts[0].address);
    }
  }, [queryClient, accounts]);

  useEffect(() => {
    if (accounts && accounts.length) {
      setMyAddress(accounts[0].address);
    }
  }, [accounts]);

  return (
    <div className="fixed top-0 left-0 right-0 bg-[#030A13] z-[100] ">
      <div
        className="flex 
              custom-2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-row xs:flex-row
              justify-between
              border-b-[1px] border-semiSplitter
              custom-2xl:h-[80px] xl:h-[80px] lg:h-[80px] md:h-[80px] sm:h-[80px] xs:h-[80px]
              w-full flex-row
            "
      >
        {/* custom-2xl:px-[56px] xl:px-[25px] lg:px-[56px] md:px-[25px] sm:px-[20px] xs:px-[24px] */}

        {/* Logo */}
        <div className="flex flex-row">
          <div
            className="flex w-20 h-20 justify-center border border-1 border-[#272829]"
            onClick={() => navigate("/")}
          >
            <LogoComp />
          </div>
          {!isSmallDevice && (
            <div className="flex justify-start">
              <div
                className="flex flex-row h-full
                      lg:justify-between md:justify-around sm:justify-between xs:justify-between
                       ml-[10px] 
                    "
              >
                {HeaderMenuTitles.map((menu: any, index) => (
                  <HeaderMenuItem
                    key={index}
                    title={menu.name}
                    link={menu.link}
                    active={active === menu.link}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Menu Items */}

        <div
          className="flex
                            custom-2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-row xs:flex-row
                            h-full self-center justify-between items-center
                            custom-2xl:w-fit xl:w-fit lg:w-fit md:w-fit sm:w-fit"
        >
          <div className="flex flex-row items-center md:justify-end sm:justify-end">
            {connected && (
              <div
                className="pr-2 h-[35px] rounded-lg flex justify-center items-center 
		text-[#929298] text-lg cursor-pointer m-4 border border-[#14B8A6] hover:text-white "
                onClick={handleOpen}
              >
                <img
                  src="/images/logo2.png"
                  className="mx-[6px] w-[20px] h-[20px]"
                />
                {/* {"| "} */}
                <p className="md:text-[12px] text-[10px]">{balance}</p>
              </div>
            )}
            {/* <div className="wallet-adapter-button-trigger">
              <WalletConnectButton
                buttonStyles={{
                  walletSelectStyles: {
                    background: { backgroundColor: "transparent" },
                    card: {
                      backgroundColor: "white",
                      float: "right",
                      marginTop: "70px",
                    },
                  },
                }}
                buttonClassName="wallet-adapter-button"
              />
            </div> */}

            <div
              className="flex wallet-adapter-button justify-end items-center mr-4"
              // style={{ margin: "35px 42px" }}
            >
              {connectedWallet != ("keplr" as WalletWindowKey) ? (
                <div className="flex items-center justify-center ">
                  <div
                    className="flex flex-row justify-center items-center"
                    onClick={async () => {
                      if (!window.keplr) {
                        toast.warn("Please install keplr extension");
                      } else {
                        connect("keplr");
                        // (window as any).keplr.enable('atlantic-2');
                        // const address = await (window as any)
                        //   .getOfflineSigner("atlantic-2")
                        //   .getAccounts();
                        // console.log(address[0].address);
                        // setMyAddress(address[0].address);
                        // dispatch(setConnectionState({ state: !connectionState }));
                        // dispatch(setMyWalletAddress({ address: address[0].address }));
                      }
                    }}
                  >
                    <img src="/images/SEI.svg"></img>
                    <p className="sm:text-[12px] text-[10px] flex items-center justify-center">
                      &nbsp;Connect Wallet
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className="flex flex-row"
                  onClick={() => {
                    disconnect();
                  }}
                >
                  <img src="/images/SEI.svg"></img>
                  <p className="sm:text-[12px] text-[10px] flex items-center">
                    &nbsp;{" "}
                    {myAddress.substring(0, 6) +
                      "..." +
                      myAddress.substring(myAddress.length - 3)}
                  </p>
                </div>
              )}
            </div>

            {/* For Test */}

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ textAlign: "center" }}
                >
                  Deposit / Withdraw
                </Typography>
                <div className="flex flex-row mt-3 justify-between">
                  <TextField
                    id="outlined-number"
                    label="Deposit amount"
                    type="number"
                    className="w-[240px]"
                    size="small"
                    value={depositAmount}
                    onChange={(e) => {
                      try {
                        setDepositAmount(Number(e.target.value));
                      } catch (err) {
                        toast.warn("Input correct amount");
                      }
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <div
                    className="flex justify-end ml-3 text-[16px] h-10 cursor-pointer bg-[#14B8A6] rounded-[10px] p-2 text-white font-mono w-30"
                    onClick={() => {
                      handleButtonClick;
                      if (depositAmount <= 0) {
                        toast.warn("Input correct balance");
                        return;
                      }
                      sendToken(depositAmount);
                    }}
                  >
                    Deposit
                  </div>
                  {/* <Button
                      variant="contained"
                      sx={buttonSx}
                      disabled={loading}
                      onClick={() => {
                        handleButtonClick;
                        if (depositAmount <= 0) {
                          toast.warn("Input correct balance");
                          return;
                        }
                        sendToken(depositAmount);
                      }}
                    >
                      Deposit
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: green[500],
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-12px",
                          marginLeft: "-12px",
                        }}
                      />
                    )} */}
                </div>
                <div className="flex flex-row mt-3">
                  <TextField
                    id="outlined-number"
                    label="Withdraw amount"
                    type="number"
                    className="w-[240px]"
                    size="small"
                    value={withdrawAmount}
                    onChange={(e) => {
                      try {
                        setWithdrawAmount(Number(e.target.value));
                      } catch (err) {
                        toast.warn("Input correct amount");
                      }
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <div
                    className="justify-end ml-3 text-[16px] h-10 cursor-pointer bg-[#14B8A6] rounded-[10px] p-2 ml-4 font-mono text-white w-30"
                    onClick={async () => {
                      if (sending) {
                        toast.warn("Wait");
                        return;
                      }
                      if (withdrawAmount <= 0) {
                        toast.warn("Input correct balance");
                        return;
                      }
                      setSending(true);
                      if (!signingClient || !accounts) {
                        toast.warn("Wallet is not connected");
                        return;
                      }

                      try {
                        const result = await apiCaller.post(
                          "tetrises/claimAmount",
                          {
                            walletAddress: accounts[0].address,
                            amount: withdrawAmount,
                          }
                        );
                        console.log(result.data);
                        await getMyInfo(accounts[0].address);

                        setSending(false);
                        handleClose();
                      } catch (err) {
                        console.log(err);
                        setSending(false);
                        toast.warn("error");
                        return;
                      }
                    }}
                  >
                    Withdraw
                  </div>
                </div>
              </Box>
            </Modal>

            <ToastContainer className="text-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
