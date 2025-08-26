const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const db = require('../db');

router.use(authenticateToken);

router.get('/', async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await db.query('SELECT id, title, url FROM links WHERE user_id = $1 ORDER BY display_order ASC', [userId]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    const { title, url } = req.body;
    const userId = req.user.id;

    if (!title || !url) {
        return res.status(400).json({ message: 'Title and URL are required.' });
    }

    try {
        const result = await db.query(
            'INSERT INTO links (user_id, title, url) VALUES ($1, $2, $3) RETURNING *',
            [userId, title, url]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/:linkId', async (req, res) => {
    const { linkId } = req.params;
    const { title, url } = req.body;
    const userId = req.user.id;

    if (!title || !url) {
        return res.status(400).json({ message: 'Title and URL are required.' });
    }

    try {
        const result = await db.query(
            'UPDATE links SET title = $1, url = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
            [title, url, linkId, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Link not found or you do not have permission to edit it.' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/:linkId', async (req, res) => {
    const { linkId } = req.params;
    const userId = req.user.id;

    try {
        const result = await db.query(
            'DELETE FROM links WHERE id = $1 AND user_id = $2 RETURNING id',
            [linkId, userId]
        );
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Link not found or you do not have permission to delete it.' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
