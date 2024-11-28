import { useEffect, useState } from 'react';
import '../css/PlayerCard.css';

function PlayerCard(props){
    
    const PlayerShirt = ({teamName}) => {
        const ImagePath = require(`../images/${teamName}.webp`);

        return (
            <img src={ImagePath} alt={teamName + 'shirt'} className='player-img' />
        );
    };

    const [isLoading, setIsLoading] = useState(true);

    const armband = () => {
        let letter = 'C';
        if (props.is_vice_captain){
            letter = 'V'
        }
        return (
            <div className={props.multiplier === 3 ? 'triple-captain' : 'armband'}>{letter}</div>
        );
    }

    useEffect(() => {
        if (props.points_explained){
            setIsLoading(false);
        }
    }, [props.points_explained])

    const mapExplanations = () => {
       return props.points_explained.map((obj) => (
            <tr key={obj.identifier}>
                <td>{obj.identifier}</td>
                <td>{obj.value}</td>
                <td>{obj.points}</td>
            </tr>
       ));
    };

    return isLoading ? (<p>Loading..</p>) : (
        <div className='player-card'>
            {(props.is_captain || props.is_vice_captain) && armband()}
            <PlayerShirt teamName={props.team} />
            <div className='player-card-name'>
                {props.name}
            </div>
            <div className='player-card-points'>
                {props.points * props.multiplier}
            </div>
            <table className='explain-points-table'>
                <thead>
                    <tr>
                        <th>Identifier</th>
                        <th>Value</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {mapExplanations()}
                </tbody>
            </table>
        </div>
    )
}

export default PlayerCard;