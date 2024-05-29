import '../css/IdInput.css';

function IdInput() {
    return (
        <div className="id-section">
            <h1>Find your team</h1>
            <div className="enter-id">
                <input type="text" className="fpl-id" placeholder="Enter your FPL ID..."/>
                <button className="submit-btn">Enter</button>
            </div>
            <p className="tip"><b>Tip:</b> You can find your FPL ID by checking the URL of your latest points on the Official FPL site. The ID will be the number found directly after "entry" in the URL.</p>
        </div>
    )
}

export default IdInput;