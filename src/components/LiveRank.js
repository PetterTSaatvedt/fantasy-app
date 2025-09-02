import { useEffect, useState } from 'react';
import '../css/LiveRank.css';
import PlayerCard from './PlayerCard';

function LiveRank(props) {
    const [liveStats, setLiveStats] = useState([]);
    const [livePoints, setLivePoints] = useState(0);
    const [calculatedPoints, setCalculatedPoints] = useState(false);
    const current = props.userData.current_event;

    async function fetchPlayerLiveStats() {
        try {
            const response = await fetch(`api/event/${current}/live/`, {
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
        if (current !== undefined){
            fetchPlayerLiveStats();
        }
    }, [props.userData]);

    const [goalkeeper, setGoalkeeper] = useState({});
    const [defenders, setDefenders] = useState([]);
    const [midfielders, setMidfielders] = useState([]);
    const [forwards, setForwards] = useState([]);
    const [bench, setBench] = useState([]);

    const calculatePoints = () => {
        let points = goalkeeper.total_points * goalkeeper.multiplier;

        for (let i = 0; i < defenders.length; i++) {
            points += defenders[i].total_points * defenders[i].multiplier;
        }

        for (let i = 0; i < midfielders.length; i++) {
            points += midfielders[i].total_points * midfielders[i].multiplier;
        }

        for (let i = 0; i < forwards.length; i++) {
            points += forwards[i].total_points * forwards[i].multiplier;
        }

        setLivePoints(points);
        setCalculatedPoints(true);
    }

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

        calculatePoints();
    }

    const teamData = props.teamData;
    const userName = props.userData.player_first_name + ' ' + props.userData.player_last_name;

    useEffect(() => {
        if (props.players.length > 0 && Object.keys(teamData).length > 0 && liveStats.length > 0){
            fillTeam();
        } else {
            console.log("No data yet.")
        }
    }, [liveStats, props.players, teamData, calculatedPoints]);
    
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

    const isoCode = () => {
        let shortIso = props.userData.player_region_iso_code_short.toLowerCase();
        let longIso = props.userData.player_region_iso_code_long.toLowerCase();
        
        if (longIso === 'eng' || longIso === 'nir' || longIso === 'sct' || longIso === 'wls'){
            return 'gb-' + longIso;
        } else {
            return shortIso;
        }
    }

    return calculatedPoints == true ? (
        <div className="live-rank-container">
            <div className='live-rank-header'>
                <h1>Live Rank - Gameweek {props.userData.current_event}</h1>
                <div className="personal-info">
                    <img src={`https://flagcdn.com/${isoCode()}.svg`} width={30} alt=''/>
                    <p>{userName}</p>
                </div>
            </div>

            <div className='team-and-stats'>
                <div className="live-rank-team">
                    <div className='live-rank-team-header'>
                        <h2>{props.userData.name}</h2>
                        <div className='gw-points'>
                            <p className='gw-points-small'>Total Points:</p>
                            <p className='gw-points-big'>{livePoints - teamData.entry_history.event_transfers_cost}</p>
                            <p className='gw-points-small'>{teamData.entry_history.event_transfers_cost > 0 && `(${livePoints} - ${teamData.entry_history.event_transfers_cost}) `}</p>
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
                    
                    <div className="stats">
                        <div className="live-rank-points">
                            <h2>Points</h2>
                            <p>Gameweek Points: {livePoints - teamData.entry_history.event_transfers_cost}</p>
                            <p>Overall points: {props.userData.summary_overall_points}</p>
                        </div>
                        <div className="live-rank-ranks">
                            <h2>Ranks</h2>
                            <p>Live Rank: {''}
                                {props.userData.summary_overall_rank.toLocaleString()}
                                {props.userData.summary_overall_rank < props.userData.leagues.classic[3].entry_last_rank ? ' ⬆️'
                                : props.userData.summary_overall_rank > props.userData.leagues.classic[3].entry_last_rank ? ' 🔻'
                                : ' 🔁'}
                            </p>
                            <p>Previous Rank: {props.userData.leagues.classic[3].entry_last_rank.toLocaleString()}</p>
                            
                            <p>{props.userData.summary_event_rank !== null && 
                            `Gameweek Rank: ${props.userData.summary_event_rank.toLocaleString()}`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (<p>Fetching team...</p>)
}

export default LiveRank;