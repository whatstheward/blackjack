import { Image, Card as SemanticCard } from 'semantic-ui-react'
import './styles.scss'

const PlayingCard = (props: Card) => {
    return <Image className='playingCard' src={props.image} size='small' />
}

export default PlayingCard