import '../css/Main.css';
import {useState} from 'react';
import Router from './Router';

function Main() {
    const [fplId, setFplId] = useState('');
    const [userData, setUserData] = useState({});
    const [teamData, setTeamData] = useState({});
    const [isIdEntered, setIsIdEntered] = useState(false);

    async function fetchUserAndTeamData() {
        try {
            const response = await fetch(`api/entry/${fplId}/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                mode: 'cors'
            });
            const userDataJson = await response.json();
            setUserData(userDataJson);

            const urlId = userDataJson.id;
            const urlCurrentEvent = userDataJson.current_event;
            const secondResponse = await fetch(`/api/entry/${urlId}/event/${urlCurrentEvent}/picks/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                mode: 'cors'
            });
            const teamDataJson = await secondResponse.json();
            setTeamData(teamDataJson);
            console.log(teamDataJson);
        } catch(error) {
            console.error(error.message);
        }
    }

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

    return (
        <div className="main-content">
            {isIdEntered ? <Router userData={userData} teamData={teamData} /> : idInput()}
        </div>
    )
}

export default Main;