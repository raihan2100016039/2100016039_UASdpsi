const express = require('express');
const router = express.Router();
const { Restaurant, Rating } = require('../models');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// Middleware to authenticate and authorize member
router.use(authenticateToken);
router.use(authorizeRole('member'));

// GET /ratings/:restaurantId
router.get('/ratings/:restaurantId', async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const ratings = await Rating.findAll({
            where: { restaurantId },
            include: [{
                model: Restaurant,
                as: 'restaurant' // Correct alias used
            }]
        });
        if (ratings.length === 0) {
            return res.status(404).json({ error: 'No ratings found for this restaurant' });
        }
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 

// Rate restaurant
router.post('/restaurant/:id/rate', async (req, res) => {
    const { id } = req.params;
    const { comment, foodRating, cleanlinessRating, serviceRating } = req.body;

    try {
        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) return res.status(404).send('Restaurant not found');

        const rating = await Rating.create({
            comment,
            foodRating,
            cleanlinessRating,
            serviceRating,
            restaurantId: id // Consistent naming
        });

        res.status(201).send('Rating added');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
