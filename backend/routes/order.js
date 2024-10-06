const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { Order, Product, Commission } = require('../models/Market');

// Create a new order
router.post('/', auth, async (req, res) => {
    try {
        const { products, shippingAddress, affiliate } = req.body;

        let totalAmount = 0;
        const orderProducts = [];

        for (let item of products) {
            const product = await Product.findById(item.product);
            if (!product) return res.status(404).json({ message: `Product ${item.product} not found` });
            if (product.stock < item.quantity) return res.status(400).json({ message: `Insufficient stock for ${product.name}` });

            totalAmount += product.price * item.quantity;
            orderProducts.push({
                product: item.product,
                quantity: item.quantity,
                price: product.price
            });

            // Update product stock
            await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
        }

        const newOrder = new Order({
            buyer: req.user.id,
            products: orderProducts,
            totalAmount,
            shippingAddress,
            affiliate
        });

        const order = await newOrder.save();

        // Create commission if there's an affiliate
        if (affiliate) {
            const affiliateCommission = totalAmount * 0.1; // Assuming 10% commission
            const newCommission = new Commission({
                affiliate,
                order: order._id,
                amount: affiliateCommission
            });
            await newCommission.save();
        }

        res.status(201).json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all orders for a user
router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user.id }).populate('products.product');
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get a single order
router.get('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('products.product');
        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (order.buyer.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update order status (for admin or seller)
router.put('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Check if user is admin or seller (you need to implement this logic)
        // if (!isAdminOrSeller(req.user.id)) {
        //     return res.status(401).json({ message: 'Not authorized' });
        // }

        order.status = status;
        await order.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;