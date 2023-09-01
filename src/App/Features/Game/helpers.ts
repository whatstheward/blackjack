const pointsReducer = (previousValue: number, currentValue: Card) => {
    if (typeof currentValue.value === 'string') {
        return previousValue + parseInt(currentValue.value)
    } else {
        return previousValue + currentValue.value
    }
}

export const calculatePoints = (cards: Card[]) => {
    let notAces = cards.filter(card => card.value !== "ACE")
    let aces = cards.filter(card => card.value === "ACE")
    notAces = valuesStringToNumber(notAces)
    let pointsNoAces = notAces.reduce(pointsReducer, 0)
    let multipleAcesUnderTwentyOne = pointsNoAces + 11 + (aces.length - 1)
    if (aces.length > 0 && (multipleAcesUnderTwentyOne <= 21)) {
        return multipleAcesUnderTwentyOne
    } else {
        return pointsNoAces + aces.length
    }
}

const valuesStringToNumber = (cards: Card[]) => {
    return cards.map((card) => {
        if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING") {
            card.value = 10
        }
        return card
    })
}