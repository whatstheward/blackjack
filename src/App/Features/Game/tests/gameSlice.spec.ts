import { store } from '../../../RTK/store'
import { calculatePoints } from '../helpers'

const initialState = {
    deck_id: "",
    dealer: { name: "Dealer", type: "dealer", cards: [], points: 0 },
    player: { name: "", type: "player", cards: [], points: 0 },
    win: null,
    loading: 'idle',
    playing: false,
} as GameState

const mockHands = {
    noAce: {
        cards: [
            {
                value: '6',
            },
            {
                value: '5',
            }
        ]
    },
    oneAceEleven: {
        cards: [
            {
                value: '6',
            },
            {
                value: 'ACE',
            }
        ]
    },
    oneAceOne: {
        cards: [
            { value: '6' },
            { value: '5' },
            { value: 'ACE' }
        ]
    },
    multipleAcesElevenAndOne: {
        cards: [
            { value: '2' },
            { value: '5' },
            { value: 'ACE' },
            { value: 'ACE' }
        ]
    },
    multipleAcesAllOnes: {
        cards: [
            { value: 'KING' },
            { value: '5' },
            { value: 'ACE' },
            { value: 'ACE' }
        ]
    }
}

describe('Game Slice', () => {
    it('should start with clean state', () => {
        const state = store.getState().game
        expect(state).toEqual(initialState)
    })
    describe('Aces', () => {
        describe('no aces', () => {
            it('should not change an y values', () => {
                const result = calculatePoints(mockHands.noAce.cards)
                expect(result).toBe(11)
            })
        })
        describe('one ace', () => {
            it('when other cards sum is below or equal to 10, ace should be worth 11 points', () => {
                const result = calculatePoints(mockHands.oneAceEleven.cards)
                expect(result).toBe(17)
            })
            it('when other cards sum is higher than or equal 11, ace should be worth 1 point', () => {
                const result = calculatePoints(mockHands.oneAceOne.cards)
                expect(result).toBe(12)
            })
        })
        describe('multiple aces', () => {
            describe('when the total value of cards that are not aces(x), plus the number of aces minus 1(y), plus 11 is less than or equal to 21', () => {
                it('one ace should be worth 11 points and the rest should be worth 1 point', () => {
                    const result = calculatePoints(mockHands.multipleAcesElevenAndOne.cards)
                    expect(result).toBe(19)
                })
            })
            describe('when the total value of cards that are not aces(x), plus the number of aces minus 1(y), plus 11 is greater than 21', () => {
                it('one ace should be worth 11 points and the rest should be worth 1 point', () => {
                    const result = calculatePoints(mockHands.multipleAcesAllOnes.cards)
                    expect(result).toBe(17)
                })
            })
        })
    })
})