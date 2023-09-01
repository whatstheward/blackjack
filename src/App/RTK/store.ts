import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import gameReducer from '../Features/Game/gameSlice'

export const store = configureStore({
    reducer: {
        game: gameReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
