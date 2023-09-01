import { useAppSelector } from "src/App/hooks"
import Cards from "../Cards"
import '../styles.scss'
import { Divider, Grid, Header, Segment } from "semantic-ui-react"

const Dealer = () => {
    const { dealer } = useAppSelector(state => state.game)

    return (
        <Grid columns={2}>
            <Grid.Column width={4}>
                <Header as='h2' size='medium'>
                    Dealer
                </Header>
                <Divider />
                <Segment className="player-info">
                    <Header as='h3'>Score: {dealer.points}</Header>
                </Segment>
            </Grid.Column>
            <Grid.Column width={12}>
                <Cards cards={dealer.cards} />
            </Grid.Column>
        </Grid>)
}

export default Dealer