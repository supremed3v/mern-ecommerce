import Stripe from "stripe";
const stripeapi = process.env.STRIPE_API_KEY;

const stripe = new Stripe("");

export const processPayment = async (req, res) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: {
      company: "Ecommerce",
    },
  });

  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
};

export const sendStripeApi = async (req, res) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
};
