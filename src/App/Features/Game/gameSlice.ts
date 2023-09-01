import { AsyncThunk, AsyncThunkAction, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { calculatePoints } from "./helpers";




interface DrawCardParams { numberOfCards: number, deckId: string, playerType: string }


export const fetchDeckThunk = createAsyncThunk<DeckOfCardsApiResponse, undefined>(
    'game/fetchDeck',
    async () => {
        return await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            .then(res => res.json())
    }
)
export const fetchCards = createAsyncThunk<DrawCardsResponse, DrawCardParams>(
    'game/drawCards',
    async ({ numberOfCards, deckId, playerType }) => {
        return await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numberOfCards}`)
            .then(res => res.json())
            .then(data => {
                return { ...data, playerType: playerType } as DrawCardsResponse
            })
    }
)



const initialState = {
    deck_id: "",
    dealer: { name: "Dealer", type: "dealer", cards: [], points: 0 },
    player: { name: "", type: "player", cards: [], points: 0 },
    win: null,
    loading: 'idle',
    playing: false,
} as GameState

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        beginOrEndGame: (state) => {
            state.playing = !state.playing
            return state
        },
        handleWin: (state, action:PayloadAction<boolean>) => {
            state.win = action.payload
            return state
        },
        resetGame: (state) => {
            state = initialState
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeckThunk.pending, (state, action) => {
                state.loading = 'pending'
            })
            .addCase(fetchDeckThunk.fulfilled, (state, action) => {
                state = { ...state, ...action.payload, loading: 'succeeded' }
                return state
            })
            .addCase(fetchCards.pending, (state, action) => {
                state.loading = 'pending'
            })
            .addCase(fetchCards.fulfilled, (state: GameState, action: PayloadAction<DrawCardsResponse>) => {
                state.loading = 'succeeded'
                const player = state[action.payload.playerType]
                const newCards = [...player.cards, ...action.payload.cards]
                const newPoints = calculatePoints(newCards)
                player.points = newPoints
                player.cards = newCards
                return state
            })
    },
})

export const {handleWin, resetGame, beginOrEndGame} = gameSlice.actions

export default gameSlice.reducer

