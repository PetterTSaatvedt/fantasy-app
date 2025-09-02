import '../css/Main.css';
import {useEffect, useState} from 'react';
import Router from './Router';

function Main() {
    const [fplId, setFplId] = useState('');
    const [userData, setUserData] = useState({});
    const [teamData, setTeamData] = useState({});
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [isIdEntered, setIsIdEntered] = useState(false);

    async function fetchPlayersAndTeams() {
        try {
            const response = await fetch(`api/bootstrap-static/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                mode: 'cors'
            });
            const data = await response.json();
            const sortedPlayers = data.elements.sort((a, b) => a.id - b.id);
            const sortedTeams = data.teams.sort((a, b) => a.id - b.id);
            setPlayers(sortedPlayers);
            setTeams(sortedTeams);
        } catch(error) {
            console.log(error.message);
        }
    }

    async function fetchUserAndTeamData() {
        try {
            const response = await fetch(`/api/entry/${fplId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                mode: 'cors'
            });
            const userDataJson = await response.json();
            setUserData(userDataJson);

            const urlCurrentEvent = userDataJson.current_event;
            const secondResponse = await fetch(`/api/entry/${fplId}/event/${urlCurrentEvent}/picks/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                mode: 'cors'
            });
            const teamDataJson = await secondResponse.json();
            setTeamData(teamDataJson);
        } catch(error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchPlayersAndTeams();
    }, []);

    const handleEnter = () => {
        setIsIdEntered(true);
        fetchUserAndTeamData();
    }

    const idInput = () => (
        <div className="id-section">
            <h1>Find your team</h1>
            <div className="enter-id">
                <input value={fplId} onChange={e => setFplId(e.target.value)} className="fpl-id" placeholder="Enter your FPL ID..."/>
                <button className="submit-btn" onClick={handleEnter}>Enter</button>
            </div>
            <p className="tip"><b>Tip:</b> You can find your FPL ID by checking the URL of your latest points on the Official FPL site. The ID will be the number found directly after "entry" in the URL.</p>
        </div>
    )

    const resetID = () => {
        setIsIdEntered(false);
        setFplId('');
    }

    return (
        <main className="main-content">
            {isIdEntered && <button className="change-id-btn" onClick={resetID}>Change ID</button>}
            {isIdEntered ? <Router userData={userData} teamData={teamData} fplId={fplId} players={players} teams={teams} /> : idInput()}
        </main>
    )
}

export default Main;