const express = require('express');
const router = express.Router();
const { Restaurant } = require('../models');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// Middleware to authenticate and authorize admin
// Middleware ini digunakan untuk mengautentikasi token dari pengguna
// dan memastikan bahwa hanya pengguna dengan peran 'admin' yang dapat mengakses endpoint berikutnya.
router.use(authenticateToken);
router.use(authorizeRole('admin'));

// Get all restaurants
// Endpoint ini digunakan untuk mendapatkan semua data restoran.
// Hanya dapat diakses oleh pengguna yang telah diautentikasi dan memiliki peran admin.
router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.status(200).json(restaurants);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add restaurant
// Endpoint ini digunakan untuk menambahkan data restoran baru.
// Hanya dapat diakses oleh pengguna yang telah diautentikasi dan memiliki peran admin.
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
// Endpoint ini digunakan untuk mengedit data restoran berdasarkan ID.
// Hanya dapat diakses oleh pengguna yang telah diautentikasi dan memiliki peran admin.
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
