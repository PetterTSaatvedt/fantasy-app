export default async function handler(req, res){
    const { fplId } = req.query;

    // Handle logic for `/api/entry/[fplId]`
    const userUrl = `https://fantasy.premierleague.com/api/entry/${fplId}/`;
    try {
        const response = await fetch(userUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

