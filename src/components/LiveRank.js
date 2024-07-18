import '../css/LiveRank.css';

function LiveRank(props) {
    let player = {
        name: '',
        points: 0,
        ownership: 0.0,
        isCaptain: false,
        isVice: false,
        position: 0,
    }

    return (
        <main>
            <div className="live-rank-team">
                <div className="starting-xi">
                    <div className="starting-keeper">Keeper</div>
                    <div className="starting-defenders">
                        <p>Defender 1</p>
                        <p>Defender 2</p>
                        <p>Defender 3</p>
                    </div>
                    <div className="starting-midfielders">
                        <p>Midfielder 1</p>
                        <p>Midfielder 2</p>
                        <p>Midfielder 3</p>
                        <p>Midfielder 4</p>
                    </div>
                    <div className="starting-forwards">
                        <p>Forward 1</p>
                        <p>Forward 2</p>
                        <p>Forward 3</p>
                    </div>
                </div>
                <div className="bench-players">
                    <div>Sub Keeper</div>
                    <div>Sub 1</div>
                    <div>Sub 2</div>
                    <div>Sub 3</div>
                </div>
            </div>
            
            <div className="live-rank-stats">
                <div className="personal-info">
                    <h2>Petter Saatvedt</h2>
                    <p>ID: {props.fplId}</p>
                    <p>Years active:</p>
                    <p>Country:</p>
                </div>
                <div className="stats">
                    <h2>Gameweek Statistics</h2>
                    <div className="live-rank-points">
                        <p>Gameweek Points:</p>
                    </div>
                    <div className="live-rank-ranks">
                        <p>Old Rank:</p>
                        <p>Live Rank:</p>
                        <p>Rank post-subs:</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default LiveRank;