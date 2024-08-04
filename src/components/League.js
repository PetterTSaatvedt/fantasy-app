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

    const leaderboard = leagueData.new_entries?.results?.map(player => 
        <li key={player.entry} className="league-leaderboard-item">
            <div className="leaderboard-rank">
                <p>1</p>
            </div>
            <h2>{player.player_first_name + ' ' + player.player_last_name}</h2>
            <p>{player.entry_name}</p>
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