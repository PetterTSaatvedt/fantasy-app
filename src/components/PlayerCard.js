import playerShirt from '../player-shirt.webp';
import '../css/PlayerCard.css';

function PlayerCard(props){
    return (
        <div className='player-card'>
            <div className='eo-wrapper'>
                <p className='eo-near'>33.3%</p>
                <p className='eo-overall'>10.3%</p>
            </div>
            <div className='player-wrapper'>
                <img src={playerShirt} alt='Player Shirt' className='player-img' />
                <p>{props.name}</p>
            </div>
            <p className='player-card-points'>0</p>
        </div>
    )
}

export default PlayerCard;