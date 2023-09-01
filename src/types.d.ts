type PlayerType = "dealer" | "player"
interface Card {
    code?: string,
    image?: string,
    images?: {
        svg: string,
        png: string,
    },
    value: string | number,
    suit?: "HEARTS" | "SPADES" | "DIAMONDS" | "CLUBS"
}

interface DeckOfCardsApiResponse extends GameType {
    success: boolean,
    deck_id: string,
}

interface GameState {
    deck_id: string,
    dealer: Player,
    player: Player,
    win: boolean | null,
    playing: boolean,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

interface DrawCardsResponse extends DeckOfCardsApiResponse {
    cards: Card[] | any[],
    remaining: number,
    playerType: PlayerType
}

interface Player {
    name: string,
    type: PlayerType
    cards: Card[],
    points: number,
}