export const fetchDeck = () => {
    return fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
                .then(res => res.json())
                .then(data => data)
}

export const fetchCards = (deckId:string, numberOfCards:number):Promise<DrawCardsResponse> => {
    return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numberOfCards}`)
        .then(res=> res.json())
        .then(data => data)
}