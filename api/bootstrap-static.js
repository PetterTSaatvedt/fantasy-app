export default async function handler(req, res) {
    const url = 'https://fantasy.premierleague.com/api/bootstrap-static/';

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
