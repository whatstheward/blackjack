import { rest } from 'msw'

export const handlers = [
    rest.get('https://deckofcardsapi.com/api/deck/new/shuffle', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "deck_id": "azwwtttcxosa",
                "remaining": 52,
                "shuffled": true,
                "success": true
            })
        )
    }),
     rest.get(`https://deckofcardsapi.com/api/deck/azwwtttcxosa/draw`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "deck_id": "azwwtttcxosa",
                "remaining": 52,
                "success": true,
                "cards": [
                    {
                        "code": "6H", 
                        "image": "https://deckofcardsapi.com/static/img/6H.png", 
                        "images": {
                                      "svg": "https://deckofcardsapi.com/static/img/6H.svg", 
                                      "png": "https://deckofcardsapi.com/static/img/6H.png"
                                  }, 
                        "value": "6", 
                        "suit": "HEARTS"
                    }, 
                    {
                        "code": "5S", 
                        "image": "https://deckofcardsapi.com/static/img/5S.png", 
                        "images": {
                                      "svg": "https://deckofcardsapi.com/static/img/5S.svg", 
                                      "png": "https://deckofcardsapi.com/static/img/5S.png"
                                  }, 
                        "value": "5", 
                        "suit": "SPADES"
                    }
                ], 
            })
        )
     })
]