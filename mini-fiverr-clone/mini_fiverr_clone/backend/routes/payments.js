const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const auth = require('../middleware/auth');
require('dotenv').config();

const stripe = Stripe(process.env.STRIPE_SECRET);

// Create a Stripe Checkout session and return session URL
router.post('/create-checkout', auth, async (req, res) => {
  try {
    const { projectTitle, amount } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: projectTitle },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],
    });
    res.json({ id: session.id, url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
