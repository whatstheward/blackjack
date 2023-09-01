import { useAppDispatch, useAppSelector } from "src/App/hooks"
import { beginOrEndGame, fetchCards, handleWin, resetGame } from "./gameSlice"
import Dealer from "src/App/Components/Dealer"
import Player from "src/App/Components/Player"
import { Button, Divider, Grid, Header, Modal } from "semantic-ui-react"
import { useEffect } from "react"
import './styles.scss'

const Game = () => {
    const dispatch = useAppDispatch()
    const { deck_id, player, playing } = useAppSelector((state) => state.game)
    useEffect(() => {
        if (player.points > 21) {
            dispatch(handleWin(false))
        } else if (player.points === 21) {
            dispatch(handleWin(true))
        }
    }, [player])

    const startGame = () => {
        dispatch(beginOrEndGame())
        dispatch(fetchCards({ numberOfCards: 2, deckId: deck_id, playerType: "dealer" })).then(() => {
            dispatch(fetchCards({ numberOfCards: 2, deckId: deck_id, playerType: "player" }))
        })
    }

    return (
        <Grid className='main-grid' width={16}>
            <Grid.Row className="header-row">
                <Header size='huge'>Blackjack</Header>
                <Button disabled={playing} onClick={startGame} color='green'>Deal</Button>
            </Grid.Row>
            <Grid.Row>
                <Dealer />
            </Grid.Row>
            <Divider />
            <Grid.Row>
                <Player />
            </Grid.Row>
        </Grid>
    )
}

export default Game