import '../css/Nav.css';
import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to={'/'}>Live Rank</Link>
                </li>
                <li>
                    <Link to={'/leagues'}>Leagues</Link>
                </li>
                <li>
                    <Link to={'/stats'}>Statistics</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;