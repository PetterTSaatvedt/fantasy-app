import '../css/Leagues.css';
import { Link } from "react-router-dom";

function Leagues(props) {
    const userData = props.userData;
    const userName = userData.player_first_name + ' ' + userData.player_last_name;

    const leagueListItems = userData.leagues?.classic?.map(league => 
    <li key={league.id}>
        <Link to={`/leagues/${league.id}`}>
            <div className="leagues-list-item">
                <h2>{league.name}</h2>
                <p>1/15</p>
            </div>
        </Link>
    </li>)

    return (
        <main>
            <div className="leagues-wrapper">
                <div className="leagues-header">
                    <h1>{userName}'s Leagues</h1>
                </div>
                <div className="leagues-list">
                    <ul>
                        {leagueListItems}
                    </ul>
                </div>
            </div>
        </main>
    )
}

export default Leagues;