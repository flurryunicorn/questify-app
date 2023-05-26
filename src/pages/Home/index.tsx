import { useNavigate } from "react-router-dom";
import { useQueryClient, useWallet, useSigningClient } from "@sei-js/react";
import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import ExploreBanner from "../../components/Explore/ExploreBanner";
import { PrimaryButton, SmallButton } from "../../components/Common/Buttons";
import { GeneralModal } from "../../components/Common/Modals";
import Input from "../../components/Common/Forms/Input";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ACTIONS from "../../config/actions";
import { setLeaderboard, setMyBalance } from "../../redux/slices/tetrisSlice";
import LeaderBoard from "../../components/Home/LeaderBoard";
import RecentScore from "../../components/Home/RecentScore";
import { apiCaller } from "../../utils/fetcher";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const { balance } = useSelector((state: any) => ({
    balance: state.tetris.balance,
  }));

  useEffect(() => {
    localStorage.setItem("betAmount", betAmount);
  }, [betAmount]);

  const { connectedWallet, offlineSigner, accounts } = useWallet();

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

  const fetchLeaderboard = async () => {
    var result = await apiCaller.get("tetrises/fetchLeaderboard");
    dispatch(setLeaderboard({ result: result.data.data }));
  };

  useEffect(() => {
    fetchLeaderboard();
    initSocket();
  }, []);

  useEffect(() => {
    getBalance();
    if (accounts && accounts.length) {
      getMyInfo(accounts[0].address);
    }
  }, [queryClient, accounts]);

  const initSocket = () => {
    // This part is main for socket.
    if (!(window as any).socket) {
      setTimeout(() => {
        initSocket();
      }, 10);
      return;
    }

    if (!(window as any).listen) {
      (window as any).socket.on("send-leaderboard", (data) => {
        dispatch(setLeaderboard(data));
      });
      (window as any).listen = true;
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

  console.log("LOCALSTORAGE::::", localStorage);
  return (
    <div className="">
      <GeneralModal
        open={modalOpen}
        title={`Start a game - ${
          level === 1 ? "Easy" : level === 2 ? "Normal" : "Hard"
        } Level `}
        subtitle={`Cost: ${
          level === 1 ? "0.01 ~ 0.1" : level === 2 ? "0.1 ~ 0.5" : "0.5+"
        } SEI, Reward ${level === 1 ? "10%" : level === 2 ? "30%" : "100%"}`}
        content={
          <Input
            caption={"Input your deposit amount"}
            value={betAmount}
            setValue={setBetAmount}
            disabled={false}
          />
        }
        onClose={() => {
          setLevel(1);
          setBetAmount("");
          setModalOpen(false);
        }}
        onConfirm={async () => {
          if (sending) return;
          if (
            Number.isNaN(Number(betAmount)) ||
            Number(betAmount) <= 0 ||
            (level === 1 && Number(betAmount) > 0.1) ||
            (level === 2 && Number(betAmount) <= 0.1) ||
            (level === 2 && Number(betAmount) > 0.5) ||
            (level === 3 && Number(betAmount) <= 0.5)
          ) {
            alert("Input correct number");
            return;
          }

          if (currentAmount < Number(betAmount)) {
            alert("You don't have enough money.");
            return;
          }

          const payResult = await sendToken(Number(betAmount));
          if (!payResult) {
            alert("An error occurred in sending payment");
            return;
          }
          (window as any).socket.emit("get-leaderboard", {});
          localStorage.setItem("gameLevel", level.toString());
          setBetAmount("");
          navigate("/tetris");
        }}
      />
      <GeneralModal
        open={claimModalOpen}
        title={"Claim SEI"}
        content={
          <Input
            caption={"Input your claim amount"}
            value={claimAmount}
            setValue={setClaimAmount}
            disabled={false}
          />
        }
        onClose={() => {
          setClaimAmount("");
          setClaimModalOpen(false);
        }}
        onConfirm={async () => {
          if (sending) {
            alert("claiming now. wait");
            return;
          }
          setSending(true);
          if (!signingClient || !accounts) {
            console.log("Wallet is not connected");
            return;
          }

          try {
            const result = await apiCaller.post("tetrises/claimAmount", {
              walletAddress: accounts[0].address,
              amount: claimAmount,
            });
            await getBalance();

            setSending(false);
            setClaimModalOpen(false);
          } catch (err) {
            console.log(err);
            setSending(false);
            alert("error");
            return;
          }
        }}
      />
      <div className="p-10">
        {connected ? (
          <div className="flex justify-end">
            <SmallButton
              caption="Easy"
              onClick={async () => {
                // try {
                //   const resp = await apiCaller.post("tetrises/checkLimit", {
                //     wallet: accounts[0].address,
                //     level: 1,
                //   });
                // } catch (err) {
                //   alert("Rate limit");
                //   return;
                // }
                setLevel(1);
                setModalOpen(true);
              }}
            />
            <SmallButton
              caption="Medium"
              onClick={async () => {
                // try {
                //   const resp = await apiCaller.post("tetrises/checkLimit", {
                //     wallet: accounts[0].address,
                //     level: 2,
                //   });
                // } catch (err) {
                //   alert("Rate limit");
                //   return;
                // }
                setLevel(2);
                setModalOpen(true);
              }}
            />
            <SmallButton
              caption="Hard"
              onClick={async () => {
                // try {
                //   const resp = await apiCaller.post("tetrises/checkLimit", {
                //     wallet: accounts[0].address,
                //     level: 3,
                //   });
                // } catch (err) {
                //   alert("Rate limit");
                //   return;
                // }
                setLevel(3);
                setModalOpen(true);
              }}
            />
          </div>
        ) : (
          <div className="mt-[80px]"></div>
        )}

        {/* For Test */}
        <div className="">
          <PrimaryButton
            caption="gotoBetting"
            onClick={() => {
              navigate("/betting");
            }}
          />
        </div>
        <div className="mr-[20px]  text-gray-200">
          Leaderboard
          <LeaderBoard level={1} simple={false} />
        </div>

        <div className="mt-20 mr-[20px]  text-gray-200">
          Recent score
          <RecentScore level={1} simple={false} />
        </div>
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
            <div className="flex flex-row mt-3">
              <TextField
                id="outlined-number"
                label="Deposit amount"
                type="number"
                className="w-[180px]"
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
                className="wallet-adapter-button flex justify-end ml-3 bg-[#fcd23c]"
                onClick={() => {
                  if (depositAmount <= 0) {
                    toast.warn("Input correct balance");
                    return;
                  }
                  sendToken(depositAmount);
                }}
              >
                Deposit
              </div>
            </div>
            <div className="flex flex-row mt-3">
              <TextField
                id="outlined-number"
                label="Withdraw amount"
                type="number"
                className="w-[200px]"
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
                className="wallet-adapter-button flex justify-end ml-3 bg-[#fcd23c]"
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
        <ToastContainer />

        <SmallButton
          caption="Claim"
          onClick={async () => {
            // try {
            //   const resp = await apiCaller.post("tetrises/checkLimit", {
            //     wallet: accounts[0].address,
            //     level: 1,
            //   });
            // } catch (err) {
            //   alert("Rate limit");
            //   return;
            // }
            setClaimModalOpen(true);
          }}
        />
      </div>
    </div>
  );
};
export default Home;
