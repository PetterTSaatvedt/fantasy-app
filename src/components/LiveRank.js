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

    return (
        <main>
            <div className="live-rank-team">
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
                    <h2>Petter Saatvedt</h2>
                    <p>ID: {props.fplId}</p>
                    <p>Years active:</p>
                    <p>Country:</p>
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