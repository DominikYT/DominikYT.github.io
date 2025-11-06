// server.js
import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 klucz prywatny Stripe (ustaw w zmiennej środowiskowej)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => ({
        price_data: {
          currency: "pln",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: 1,
      })),
      success_url: "https://dominikyt.github.io/success.html",
      cancel_url: "https://dominikyt.github.io/cancel.html",
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("✅ Stripe backend działa na porcie 3000"));
