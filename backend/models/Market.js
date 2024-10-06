const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Product Schema
const ProductSchema = new Schema({
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: [{ type: String }],
    stock: { type: Number, default: 0 },
    ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
    affiliateCommission: { type: Number, default: 0 }, // Percentage commission for affiliates
}, { timestamps: true });

// Order Schema
const OrderSchema = new Schema({
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    shippingAddress: { type: String, required: true },
    affiliate: { type: Schema.Types.ObjectId, ref: 'User' }, // The user who referred this sale, if any
}, { timestamps: true });

// Rating Schema
const RatingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String }
}, { timestamps: true });

// AffiliateLink Schema
const AffiliateLinkSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    code: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 }
}, { timestamps: true });

// Commission Schema
const CommissionSchema = new Schema({
    affiliate: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'paid'], default: 'pending' }
}, { timestamps: true });

// Payout Schema
const PayoutSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    method: { type: String, required: true }, // e.g., 'PayPal', 'Bank Transfer'
    status: { type: String, enum: ['processing', 'completed', 'failed'], default: 'processing' }
}, { timestamps: true });

module.exports = {
    Product: mongoose.model('Product', ProductSchema),
    Order: mongoose.model('Order', OrderSchema),
    Rating: mongoose.model('Rating', RatingSchema),
    AffiliateLink: mongoose.model('AffiliateLink', AffiliateLinkSchema),
    Commission: mongoose.model('Commission', CommissionSchema),
    Payout: mongoose.model('Payout', PayoutSchema)
};