import '../css/Leagues.css';
import { Link } from "react-router-dom";

function Leagues(props) {
    const userData = props.userData;
    const userName = userData.player_first_name + ' ' + userData.player_last_name;

    const grayArrow = () => {
        return (
            <div className='gray-arrow'></div>
        );
    }

    const leagueListItems = userData.leagues?.classic?.map(league =>
    league.start_event < userData.current_event && //Only show active leagues
    <li key={league.id}>
        <Link to={`/leagues/${league.id}`}>
            <div className="leagues-list-item">
                <h2>{league.name}</h2>
                <div className="leagues-list-item-rank">
                    <p><b>{league.entry_rank.toLocaleString()}</b> of {league.rank_count.toLocaleString()}</p>
                    <div>
                        {league.entry_rank == 1 && '🏆 '}
                        {
                        league.entry_rank < league.entry_last_rank ? '⬆️'
                        : league.entry_rank > league.entry_last_rank ? '🔻' 
                        : grayArrow()
                        }
                    </div>
                </div>
            </div>
        </Link>
    </li>)

    return (
        <div className="leagues-container">
            <div className="leagues-header">
                <h1>{userName}'s Leagues</h1>
            </div>
            <div className="leagues-list-wrapper">
                <ul className="leagues-list">
                    {leagueListItems}
                </ul>
            </div>
        </div>
    )
}

export default Leagues;