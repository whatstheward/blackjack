import { useAppDispatch, useAppSelector } from "src/App/hooks"
import Cards from "../Cards"
import { Button, Divider, Grid, Header, Segment } from "semantic-ui-react"
import '../styles.scss'
import { fetchCards, handleWin } from "src/App/Features/Game/gameSlice"


const Player = () => {
    const dispatch = useAppDispatch()
    const { deck_id, player, dealer, playing } = useAppSelector(state => state.game)

    const clickHitMe = () => {
        dispatch(fetchCards({ deckId: deck_id, numberOfCards: 1, playerType: "player" }))
    }

    const clickStay = () => {
        dispatch(handleWin(player.points >= dealer.points))
    }

    return (
        <Grid columns={2}>
            <Grid.Row>
                <Grid.Column width={4}>
                    <Header size="medium" as="h2">
                        Player
                    </Header>
                    <Divider />
                    <Segment textAlign="center" className="player-info">
                        <Header as='h3'>Score: {player.points}</Header>
                        <Button disabled={!playing} color='green' className="blackjack-btn" onClick={clickHitMe}>Hit Me!</Button>
                        <Button disabled={!playing} color='red' className="blackjack-btn" onClick={clickStay}>I'll stay</Button>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Cards cards={player.cards} />
                </Grid.Column>
            </Grid.Row>
        </Grid>)
}

export default Player