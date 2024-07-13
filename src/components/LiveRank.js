import '../css/LiveRank.css';

function LiveRank(props) {
    return (
        <main>
            <div className="live-rank-team">
                <div className="starting-xi">
                    Starting XI
                </div>
                <div className="bench-players">
                    Bench
                </div>
            </div>
            
            <div className="live-rank-stats">
                <p>{props.fplId}</p>
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
        </main>
    )
}

export default LiveRank;