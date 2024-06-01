import '../css/Main.css';
import {useState} from 'react';
import Router from './Router';

function Main() {
    const [fplId, setFplId] = useState('');
    const [isIdEntered, setIsIdEntered] = useState(false);

    const handleEnter = () => {
        setIsIdEntered(true);
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
            {isIdEntered ? <Router /> : idInput()}
        </div>
    )
}

export default Main;