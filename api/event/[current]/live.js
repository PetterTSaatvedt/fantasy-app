export default async function handler(req, res){
    const { current } = req.query;

    const currentEventUrl = `https://fantasy.premierleague.com/api/event/${current}/live/`;
    try {
        const response = await fetch(currentEventUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch event data: ${response.statusText}`);
        }
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}