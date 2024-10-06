const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { AffiliateLink, Commission, Product } = require('../models/Market');

// Create a new affiliate link
router.post('/link', auth, async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const code = Math.random().toString(36).substring(7);
        const newLink = new AffiliateLink({
            user: req.user.id,
            product: productId,
            code
        });

        const link = await newLink.save();
        res.status(201).json(link);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all affiliate links for a user
router.get('/links', auth, async (req, res) => {
    try {
        const links = await AffiliateLink.find({ user: req.user.id }).populate('product');
        res.json(links);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get commissions for a user
router.get('/commissions', auth, async (req, res) => {
    try {
        const commissions = await Commission.find({ affiliate: req.user.id }).populate('order');
        res.json(commissions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Track affiliate link click
router.get('/click/:code', async (req, res) => {
    try {
        const link = await AffiliateLink.findOne({ code: req.params.code });
        if (!link) return res.status(404).json({ message: 'Affiliate link not found' });

        link.clicks += 1;
        await link.save();

        res.json({ message: 'Click tracked' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;