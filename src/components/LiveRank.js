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

    const [goalkeeper, setGoalkeeper] = useState({});
    const [defenders, setDefenders] = useState([]);
    const [midfielders, setMidfielders] = useState([]);
    const [forwards, setForwards] = useState([]);
    const [bench, setBench] = useState([]);

    function fillTeam() {
        let defenderArray = [];
        let midfielderArray = [];
        let forwardArray = [];
        let benchArray = [];

        let picks = props.teamData.picks;
        for (let i = 0; i < picks.length; i++){
            let positionGroup = props.players[picks[i].element - 1].element_type;

            if (picks[i].position <= 11){
                switch(positionGroup) {
                    //goalkeepers
                    case 1:
                        setGoalkeeper({
                            name: props.players[picks[i].element - 1].web_name,
                            total_points: liveStats[picks[i].element - 1].stats.total_points,
                            points_explained: liveStats[picks[i].element -1].explain[0].stats, //returns array of objects (object values: identifier, points, value)
                            team: props.teams[props.players[picks[i].element - 1].team - 1].name,
                            is_captain: picks[i].is_captain,
                            is_vice_captain: picks[i].is_vice_captain,
                            multiplier: picks[i].multiplier
                        });
                        break;
                    //defenders
                    case 2:
                        defenderArray.push({
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
                        midfielderArray.push({
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
                        forwardArray.push({
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
                benchArray.push({
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

        setDefenders(defenderArray);
        setMidfielders(midfielderArray);
        setForwards(forwardArray);
        setBench(benchArray);
    }

    const teamData = props.teamData;
    const userName = props.userData.player_first_name + ' ' + props.userData.player_last_name;

    useEffect(() => {
        if (props.players.length > 0 && Object.keys(teamData).length > 0 && liveStats.length > 0){
            fillTeam();
        } else {
            console.log("No data yet.")
        }
    }, [liveStats, props.players, teamData]);
    
   
    const renderPlayers = (arr) => arr.map(player =>
        <PlayerCard 
            name={player.name}
            points={player.total_points}
            team={player.team}
            points_explained={player.points_explained}
            key={player.name}
            is_captain={player.is_captain}
            is_vice_captain={player.is_vice_captain}
            multiplier={player.multiplier}
        />
    )

    return forwards.length ? (
        <div className="live-rank-container">
            <div className="live-rank-team">
                <div className='live-rank-team-header'>
                    <h1>{props.userData.name}</h1>
                    <div className='gw-points'>
                        <p>GW Points: {''}
                            {teamData.entry_history.event_transfers_cost > 0 && `(${teamData.entry_history.points} - ${teamData.entry_history.event_transfers_cost}) `}
                            <b>{teamData.entry_history.points - teamData.entry_history.event_transfers_cost}</b>
                        </p>
                    </div>
                </div>
                <div className="starting-xi">
                    <div className="starting-keeper">
                        <PlayerCard 
                            name={goalkeeper.name} 
                            points={goalkeeper.total_points} 
                            team={goalkeeper.team} 
                            points_explained={goalkeeper.points_explained}
                            is_captain={goalkeeper.is_captain}
                            is_vice_captain={goalkeeper.is_vice_captain}
                            multiplier={goalkeeper.multiplier}
                        />
                    </div>
                    <div className="starting-defenders">
                       {renderPlayers(defenders)}
                    </div>
                    <div className="starting-midfielders">
                        {renderPlayers(midfielders)}
                    </div>
                    <div className="starting-forwards">
                        {renderPlayers(forwards)}
                    </div>
                </div>
                <div className="bench-players">
                    {renderPlayers(bench)}
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
                        <p>Gameweek Rank: {props.userData.summary_event_rank.toLocaleString()}</p>
                        <p>Old Rank:</p>
                        <p>New Rank: {props.userData.summary_overall_rank.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    ) : (<p>Fetching team...</p>)
}

export default LiveRank;