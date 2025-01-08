export default async function handler(req, res){
    const { leagueId } = req.query;

    const leagueUrl = `https://fantasy.premierleague.com/api/leagues-classic/${leagueId}/standings/`;
    try {
        const response = await fetch(leagueUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch league data: ${response.statusText}`);
        }
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}



