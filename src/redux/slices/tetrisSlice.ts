import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TetrisState {
    winners: any[];
    balance: number;
    myInfo:object;
    myXP:number;
    modalOpen:boolean;
    clickedCardNum:number;
    depositModalOpen:boolean;

}

const initialState: TetrisState = {
    winners: [],
    balance: 0,
    myInfo:{},
    myXP:0,
    modalOpen:false,
    clickedCardNum:0,
    depositModalOpen:false,


}

export const tetrisSlice = createSlice({
    name: 'chat',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setLeaderboard: (state, action: PayloadAction<any>) => {
            state.winners = action.payload.result;
        },
        setMyBalance: (state, action: PayloadAction<any>) => {
            state.balance = action.payload.balance;
        },        
        setMyInfo: (state, action: PayloadAction<any>) => {
            console.log(action.payload, action.payload.myInfo)
            state.myInfo = action.payload.myInfo;
        },
        setMyXP: (state, action: PayloadAction<any>) => {
            state.myXP = action.payload.myXP;
        },
        setModalOpen: (state, action: PayloadAction<any>) => {
            state.modalOpen = action.payload.modalOpen;
        },
        setClickedCardNum: (state, action: PayloadAction<any>) => {
            state.clickedCardNum = action.payload.clickedCardNum;
        },
        setDepositModalOpen: (state, action: PayloadAction<any>) => {
            state.depositModalOpen = action.payload.depositModalOpen;
        },

    },
})

export const {
  setLeaderboard,
  setMyBalance,
  setMyInfo,
  setMyXP,
  setModalOpen,
  setClickedCardNum,
  setDepositModalOpen,

} = tetrisSlice.actions

export default tetrisSlice.reducer