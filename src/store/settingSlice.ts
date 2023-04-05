import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface SettingState {
    secretMode: boolean,
    darkMode: boolean,
    pinLength: number
}

const initialState: SettingState = {
    secretMode: false,
    darkMode: true,
    pinLength: 4
}

export const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        changeSecretMode: (state, action: PayloadAction<boolean>) => {
            state.secretMode = action.payload
        },
        changeTheme: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload
        },
        changePinLength: (state, action: PayloadAction<number>) => {
            state.pinLength = action.payload
        }
    },
})

export const { changeSecretMode, changePinLength, changeTheme } = settingSlice.actions

export default settingSlice.reducer