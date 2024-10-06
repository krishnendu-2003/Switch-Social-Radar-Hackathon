const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { Payout, Commission } = require('../models/Market');

// Request a payout
router.post('/request', auth, async (req, res) => {
    try {
        const { amount, method } = req.body;

        // Check if user has enough unpaid commissions
        const unpaidCommissions = await Commission.find({ affiliate: req.user.id, status: 'pending' });
        const totalUnpaid = unpaidCommissions.reduce((sum, commission) => sum + commission.amount, 0);

        if (totalUnpaid < amount) {
            return res.status(400).json({ message: 'Insufficient unpaid commissions' });
        }

        const newPayout = new Payout({
            user: req.user.id,
            amount,
            method
        });

        const payout = await newPayout.save();

        // Update commissions status
        let remainingAmount = amount;
        for (let commission of unpaidCommissions) {
            if (remainingAmount <= 0) break;

            if (commission.amount <= remainingAmount) {
                commission.status = 'paid';
                remainingAmount -= commission.amount;
            } else {
                const paidPortion = new Commission({
                    affiliate: req.user.id,
                    order: commission.order,
                    amount: remainingAmount,
                    status: 'paid'
                });
                await paidPortion.save();

                commission.amount -= remainingAmount;
                remainingAmount = 0;
            }
            await commission.save();
        }

        res.status(201).json(payout);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all payouts for a user
router.get('/', auth, async (req, res) => {
    try {
        const payouts = await Payout.find({ user: req.user.id });
        res.json(payouts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update payout status (for admin)
router.put('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const payout = await Payout.findById(req.params.id);
        if (!payout) return res.status(404).json({ message: 'Payout not found' });

        // Check if user is admin (you need to implement this logic)
        // if (!isAdmin(req.user.id)) {
        //     return res.status(401).json({ message: 'Not authorized' });
        // }

        payout.status = status;
        await payout.save();
        res.json(payout);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;