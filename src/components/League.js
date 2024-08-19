import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../css/League.css';

function League(){
    const params = useParams();
    const leagueId = params.id;

    const [leagueData, setLeagueData] = useState({});

    const fetchLeagueData = async() => {
        try {
            const response = await fetch(`/api/leagues-classic/${leagueId}/standings/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                mode: 'cors'
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }
            const leagueDataJson = await response.json();
            setLeagueData(leagueDataJson);
            console.log(leagueData);
        } catch(error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchLeagueData();
    }, []);

    const leaderboard = leagueData.standings?.results?.map(player => 
        <li key={player.entry} className="league-leaderboard-item">
            <div className="leaderboard-rank">
                <p>{player.rank}</p>
            </div>
            <div className="leaderboard-info">
                <h2>{player.player_name} ({player.entry_name})</h2>
                <div className="leaderboard-info-points">
                    <p>Round: <b>{player.event_total}</b></p>
                    <p>Total: <b>{player.total}</b></p>
                </div>
            </div>
        </li>)

    return (
        <main>
            <div className="league-wrapper">
                <h1>{leagueData.league?.name}</h1>
                <ol className="league-leaderboard">
                    {leaderboard}
                </ol>
            </div>
        </main>
        
    )
}

export default League;