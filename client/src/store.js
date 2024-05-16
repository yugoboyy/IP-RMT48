import { configureStore } from '@reduxjs/toolkit'
import characterReducer from "./features/character/characterSlice"

export const store = configureStore({
    reducer: {
        characters: characterReducer
    },
})

