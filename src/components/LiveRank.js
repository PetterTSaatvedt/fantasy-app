import { useEffect, useState } from 'react';
import '../css/LiveRank.css';
import PlayerCard from './PlayerCard';

function LiveRank(props) {
    const [liveStats, setLiveStats] = useState([]);

    async function fetchPlayerLiveStats() {
        try {
            const response = await fetch(`api/event/${props.userData.current_event}/live/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                mode: 'cors'
            });
            const data = await response.json();
            setLiveStats(data.elements);
            console.log(data.elements); 
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPlayerLiveStats();
    }, [props.userData]);

    let defenders = [];
    let midfielders = [];
    let attackers = [];

    const teamData = props.teamData;
    const userName = props.userData.player_first_name + ' ' + props.userData.player_last_name;

    return Object.keys(teamData).length > 0 ? (
        <main>
            <div className="live-rank-team">
                <div className='live-rank-team-header'>
                    <h1>{props.userData.name}</h1>
                    <div className='gw-points'>
                        <p>GW Points: {teamData.entry_history.points}</p>
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
                    <p>Years active: {props.userData.years_active}</p>
                    <p>Country: {props.userData.player_region_name}</p>
                    <p>Overall points: {props.userData.summary_overall_points}</p>
                </div>
                <div className="stats">
                    <h2>Gameweek {props.userData.current_event} Statistics</h2>
                    <div className="live-rank-points">
                        <p>Gameweek Points: {teamData.entry_history.points}</p>
                    </div>
                    <div className="live-rank-ranks">
                        <p>Gameweek Rank: {props.userData.summary_event_rank}</p>
                        <p>Old Rank:</p>
                        <p>New Rank: {props.userData.summary_overall_rank}</p>
                    </div>
                </div>
            </div>
        </main>
    ) : (<p>Fetching team...</p>)
}

export default LiveRank;