const express = require('express');
const router = express.Router();
const { Restaurant, Rating } = require('../models');
const {authenticateToken} = require ('../middleware/auth');

// POST /ratings
router.post('/ratings',authenticateToken, async (req, res) => {
    try {
        const { restaurantId, comment, foodRating, cleanlinessRating, serviceRating } = req.body;

        // Find the restaurant
        const restaurant = await Restaurant.findByPk(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }

        // Create new rating
        const rating = await Rating.create({
            comment,
            foodRating,
            cleanlinessRating,
            serviceRating,
            RestaurantId: restaurantId
        });

        res.status(201).json(rating);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /ratings
router.get('/ratings',authenticateToken, async (req, res) => {
    try {
        const ratings = await Rating.findAll({
            include: [{
                model: Restaurant,
                as: 'restaurant' // Perbaiki alias yang digunakan
            }]
        });
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /ratings/:restaurantId
router.get('/ratings/:restaurantId', async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const ratings = await Rating.findAll({
            where: { RestaurantId: restaurantId },
            include: [{
                model: Restaurant,
                as: 'restaurant' // Perbaiki alias yang digunakan
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

module.exports = router;
