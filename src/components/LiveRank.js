import '../css/LiveRank.css';
import PlayerCard from './PlayerCard';

function LiveRank(props) {
    let player = {
        name: '',
        points: 0,
        ownership: 0.0,
        isCaptain: false,
        isVice: false,
        position: 0,
    }

    const userName = props.userData.player_first_name + ' ' + props.userData.player_last_name;

    return (
        <main>
            <div className="live-rank-team">
                <div className='live-rank-team-header'>
                    <h1>{props.userData.name}</h1>
                    <div className='gw-points'>
                        <p>GW Points: 0</p>
                    </div>
                </div>
                <div className="starting-xi">
                    <div className="starting-keeper">
                        <PlayerCard name='Raya' />
                    </div>
                    <div className="starting-defenders">
                        <PlayerCard name='Saliba' />
                        <PlayerCard name='Gabriel' />
                        <PlayerCard name='White' />
                    </div>
                    <div className="starting-midfielders">
                        <PlayerCard name='Saka' />
                        <PlayerCard name='Ødegaard' />
                        <PlayerCard name='Martinelli' />
                        <PlayerCard name='Rice' />
                    </div>
                    <div className="starting-forwards">
                        <PlayerCard name='Havertz' />
                        <PlayerCard name='Jesus' />
                        <PlayerCard name='Nketiah' />
                    </div>
                </div>
                <div className="bench-players">
                    <PlayerCard name='Ramsdale' />
                    <PlayerCard name='Calafiori' />
                    <PlayerCard name='Nwaneri' />
                    <PlayerCard name='Timber' />
                </div>
            </div>
            
            <div className="live-rank-stats">
                <div className="personal-info">
                    <h2>{userName}</h2>
                    <p>ID: {props.userData.id}</p>
                    <p>Years active: {props.userData.years_active}</p>
                    <p>Country: {props.userData.player_region_name}</p>
                </div>
                <div className="stats">
                    <h2>Gameweek Statistics</h2>
                    <div className="live-rank-points">
                        <p>Gameweek Points:</p>
                    </div>
                    <div className="live-rank-ranks">
                        <p>Old Rank:</p>
                        <p>Live Rank:</p>
                        <p>Rank post-subs:</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default LiveRank;