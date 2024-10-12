import '../css/PlayerCard.css';

function PlayerCard(props){
    
    const PlayerShirt = ({teamName}) => {
        const ImagePath = require(`../images/${teamName}.webp`);

        return (
            <img src={ImagePath} alt={teamName + 'shirt'} className='player-img' />
        );
    };
    
    return (
        <div className='player-card'>
            <div className='eo-wrapper'>
                <p className='eo-near'>33.3%</p>
                <p className='eo-overall'>10.3%</p>
            </div>
            <div className='player-wrapper'>
                <PlayerShirt teamName={props.team} />
                <p>{props.name}</p>
            </div>
            <p className='player-card-points'>{props.points}</p>
        </div>
    )
}

export default PlayerCard;