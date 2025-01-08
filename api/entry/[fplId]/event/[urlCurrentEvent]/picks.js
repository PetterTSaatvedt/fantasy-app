export default async function handler(req, res) {
    const { fplId, urlCurrentEvent } = req.query;

    // Handle logic for `/api/entry/[fplId]/event/[urlCurrentEvent]/picks`
    const picksUrl = `https://fantasy.premierleague.com/api/entry/${fplId}/event/${urlCurrentEvent}/picks/`;
    try {
        const response = await fetch(picksUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch picks data: ${response.statusText}`);
        }
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
