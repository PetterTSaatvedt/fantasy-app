
function Leagues(props) {
    const userData = props.userData;
    const userName = userData.player_first_name + ' ' + userData.player_last_name;

    const leagueListItems = userData.leagues?.classic?.map(league => <li key={league.id}>{league.id}</li>)

    return (
        <main>
            <h1>{userName}'s Leagues</h1>
            <div className="leagues-list">
                <ul>
                    {leagueListItems}
                </ul>
            </div>
        </main>
    )
}

export default Leagues;