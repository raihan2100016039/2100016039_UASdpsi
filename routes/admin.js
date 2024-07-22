const express = require('express');
const router = express.Router();
const { Restaurant } = require('../models');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// Middleware to authenticate and authorize admin
router.use(authenticateToken);
router.use(authorizeRole('admin'));

// Get all restaurants
router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.status(200).json(restaurants);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add restaurant
router.post('/restaurants', async (req, res) => {
    const { name, owner, address, mapAddress } = req.body;
    try {
        const restaurant = await Restaurant.create({ name, owner, address, mapAddress });
        res.status(201).send('Restaurant added');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Edit restaurant
router.put('/restaurants/:id', async (req, res) => {
    const { id } = req.params;
    const { name, owner, address, mapAddress, status } = req.body;

    try {
        const [updated] = await Restaurant.update({ name, owner, address, mapAddress, status }, { where: { id } });
        if (!updated) return res.status(404).send('Restaurant not found');
        res.send('Restaurant updated');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
