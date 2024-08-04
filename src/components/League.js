import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function League(props){
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
    }, [])

    return (
        <p>{leagueData.league?.name}</p>
    )
}

export default League;