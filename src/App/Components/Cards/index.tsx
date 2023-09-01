import { Container } from "semantic-ui-react"
import PlayingCard from "./PlayingCard"
import './styles.scss'

interface Props {
    cards: Card[]
}

const Cards = ({cards}:Props) => {
    return <Container className="cardContainer">
            {cards.map((card)=>{
               return <PlayingCard key={card.code} {...card} />
            })}
        </Container>
}

export default Cards