import playerShirt from '../player-shirt.webp';
import '../css/PlayerCard.css';

function PlayerCard(props){
    return (
        <div className='player-card'>
            <div className='eo-wrapper'>
                <p className='eo-near'>33.3%</p>
                <p className='eo-overall'>10.3%</p>
            </div>
            <img src={playerShirt} alt='Player Shirt' className='player-img' />
            <h2>{props.name}</h2>
            <p>0</p>
        </div>
    )
}

export default PlayerCard;