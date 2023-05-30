import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TetrisState {
    winners: any[];
    balance: number;
    myInfo:object;
    myXP:number;
}

const initialState: TetrisState = {
    winners: [],
    balance: 0,
    myInfo:{},
    myXP:0,

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
            state.myInfo = action.payload.myInfo;
        },
        setMyXP: (state, action: PayloadAction<any>) => {
            state.myXP = action.payload.myXP;
        },

    },
})

export const {
  setLeaderboard,
  setMyBalance,
  setMyInfo,
  setMyXP,

} = tetrisSlice.actions

export default tetrisSlice.reducer
