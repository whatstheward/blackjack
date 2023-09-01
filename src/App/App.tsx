import { useEffect, useReducer, useState } from "react"
// import useGameContext, { GameContext, GameContextProvider } from "src/context/Game"
import Game from "./Features/Game"
import { useAppDispatch, useAppSelector } from "./hooks"
import { fetchDeckThunk, resetGame } from "./Features/Game/gameSlice"
import { Button, Container, Grid, Header, Modal, Segment } from "semantic-ui-react"

const App = () => {
  const dispatch = useAppDispatch()
  const { win, player, dealer } = useAppSelector((state) => state.game)
  useEffect(() => {
    if (win === null) {
      dispatch(fetchDeckThunk())
    }
    return () => {
    }
  }, [win])

  const handleReset = () => {
    dispatch(resetGame())
  }


  return (
    <Container className="app-container">
      <Modal open={typeof win === 'boolean'} className="endGameModal">
        <Modal.Header>
          {win ? 'Congratulations!' : 'Better luck next time!'}
        </Modal.Header>
        <Modal.Content>
          <Header as='h4' size="small">Final Score</Header>
          <Segment>
            <Grid columns={2} stackable textAlign='center'>
              <Grid.Column>
                <Header as='h5' size="small">
                  Player
                </Header>
                <Header size='large' color={win ? 'green' : 'red'}>
                  {player.points}
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h5' size="small">
                  Dealer
                </Header>
                <Header size='large' color={win ? 'red' : 'green'}>
                  {dealer.points}
                </Header>
              </Grid.Column>
            </Grid>
          </Segment>
          <Button color='linkedin' onClick={() => handleReset()}>Play Again?</Button>
        </Modal.Content>
      </Modal>
      <Game />
    </Container>
  )
}

export default App