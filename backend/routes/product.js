const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');
const Product = require('../models/Market').Product;
const User = require('../models/User');

// Create a new product
router.post('/', auth, upload.array('images', 5), async (req, res) => {
    try {
        const { name, description, price, category, stock, affiliateCommission } = req.body;
        const images = req.files ? req.files.map(file => file.location) : [];

        const newProduct = new Product({
            seller: req.user.id,
            name,
            description,
            price,
            category,
            images,
            stock,
            affiliateCommission
        });

        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('seller', 'username');
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get a single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('seller', 'username');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a product
router.put('/:id', auth, upload.array('images', 5), async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (product.seller.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const { name, description, price, category, stock, affiliateCommission } = req.body;
        const images = req.files ? req.files.map(file => file.location) : product.images;

        product = await Product.findByIdAndUpdate(req.params.id, {
            name,
            description,
            price,
            category,
            images,
            stock,
            affiliateCommission
        }, { new: true });

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a product
router.delete('/:id', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (product.seller.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await product.remove();
        res.json({ message: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;