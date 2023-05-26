import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TetrisState {
    winners: any[];
    balance: number
}

const initialState: TetrisState = {
    winners: [],
    balance: 0
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
    },
})

export const {
  setLeaderboard,
  setMyBalance
} = tetrisSlice.actions

export default tetrisSlice.reducer
