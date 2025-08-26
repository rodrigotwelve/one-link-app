const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const userResult = await db.query('SELECT id, username FROM users WHERE username = $1', [username]);
        
        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        const user = userResult.rows[0];

        const linksResult = await db.query(
            'SELECT title, url, display_order FROM links WHERE user_id = $1 ORDER BY display_order ASC',
            [user.id]
        );

        res.status(200).json({
            username: user.username,
            links: linksResult.rows
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
