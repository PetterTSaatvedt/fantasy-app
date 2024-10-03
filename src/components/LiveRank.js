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
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (props.userData.current_event !== undefined){
            fetchPlayerLiveStats();
        }
    }, [props.userData]);

    let goalkeeper = {};
    let defenders = [];
    let midfielders = [];
    let forwards = [];
    let bench = [];

    function fillTeam() {
        // props.players = [{}, {}, {}...]
        // props.teams = [{}, {}, {}...]
        // props.teamData.elements = [{}, {}, {}...]
        console.log(props.teamData.picks);
        let picks = props.teamData.picks;
        for (let i = 0; i < picks.length; i++){
            let positionGroup = props.players[picks[i].element - 1].element_type;
            console.log(positionGroup);
            if (picks[i].position <= 11){
                switch(positionGroup) {
                    //goalkeepers
                    case 1:
                        goalkeeper = {
                            name: props.players[picks[i].element - 1].web_name,
                            total_points: liveStats[picks[i].element - 1].stats.total_points,
                            points_explained: liveStats[picks[i].element -1].explain[0].stats, //returns array of objects (object values: identifier, points, value)
                            team: props.teams[props.players[picks[i].element - 1].team - 1].name,
                            is_captain: picks[i].is_captain,
                            is_vice_captain: picks[i].is_vice_captain,
                            multiplier: picks[i].multiplier
                        }
                        break;
                    //defenders
                    case 2:
                        defenders.push({
                            name: props.players[picks[i].element - 1].web_name,
                            total_points: liveStats[picks[i].element - 1].stats.total_points,
                            points_explained: liveStats[picks[i].element -1].explain[0].stats, //returns array of objects (object values: identifier, points, value)
                            team: props.teams[props.players[picks[i].element - 1].team - 1].name,
                            is_captain: picks[i].is_captain,
                            is_vice_captain: picks[i].is_vice_captain,
                            multiplier: picks[i].multiplier
                        });
                        break;
                    //midfielders
                    case 3:
                        midfielders.push({
                            name: props.players[picks[i].element - 1].web_name,
                            total_points: liveStats[picks[i].element - 1].stats.total_points,
                            points_explained: liveStats[picks[i].element -1].explain[0].stats, //returns array of objects (object values: identifier, points, value)
                            team: props.teams[props.players[picks[i].element - 1].team - 1].name,
                            is_captain: picks[i].is_captain,
                            is_vice_captain: picks[i].is_vice_captain,
                            multiplier: picks[i].multiplier
                        });
                        break;
                    //forwards
                    case 4:
                        forwards.push({
                            name: props.players[picks[i].element - 1].web_name,
                            total_points: liveStats[picks[i].element - 1].stats.total_points,
                            points_explained: liveStats[picks[i].element -1].explain[0].stats, //returns array of objects (object values: identifier, points, value)
                            team: props.teams[props.players[picks[i].element - 1].team - 1].name,
                            is_captain: picks[i].is_captain,
                            is_vice_captain: picks[i].is_vice_captain,
                            multiplier: picks[i].multiplier
                        });
                        break;
                    default:
                }
            } else {
                bench.push({
                    name: props.players[picks[i].element - 1].web_name,
                    total_points: liveStats[picks[i].element - 1].stats.total_points,
                    points_explained: liveStats[picks[i].element -1].explain[0].stats, //returns array of objects (object values: identifier, points, value)
                    team: props.teams[props.players[picks[i].element - 1].team - 1].name,
                    is_captain: picks[i].is_captain,
                    is_vice_captain: picks[i].is_vice_captain,
                    multiplier: picks[i].multiplier
                });
            }
        }

        console.log(goalkeeper);
        console.log(defenders);
        console.log(midfielders);
        console.log(forwards);
        console.log(bench);
    }


    useEffect(() => {
        if (props.players.length > 0 && Object.keys(teamData).length > 0 && liveStats.length > 0){
            fillTeam();
        } else {
            console.log("No data yet.")
        }
    }, [liveStats]);
    
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