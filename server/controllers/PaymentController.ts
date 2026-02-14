import { Request, Response } from "express";
import User from "../models/User.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay
// Note: These should be in your .env file
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || ''
});

// Plan Details (for reference and validation)
const PLANS = {
    'Free': { price: 0, credits: 5 },
    'Go': { price: 399, credits: 50 }, // Example credits
    'Plus': { price: 1999, credits: 500 }, // Example credits
    'Pro': { price: 19900, credits: 5000 }, // Example credits
    'Team': { price: 6999, credits: 2000 },
    'Enterprise': { price: 49900, credits: 15000 }
};

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { planId } = req.body;
        const { userId } = req.session;

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        if (!planId || !PLANS[planId as keyof typeof PLANS]) {
            return res.status(400).json({ success: false, message: 'Invalid plan' });
        }

        const plan = PLANS[planId as keyof typeof PLANS];
        const amount = plan.price * 100; // Amount in paise

        if (amount === 0) {
            return res.json({ success: true, orderId: null, amount: 0 }); // Free plan
        }

        // Razorpay receipt has a 40 char limit
        const options = {
            amount: amount,
            currency: "INR",
            receipt: `rec_${userId.slice(-10)}_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        res.json({ success: true, order });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, message: (error as Error).message });
    }
};

export const verifyPayment = async (req: Request, res: Response) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = req.body;
        const { userId } = req.session;

        // Verify Signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || '')
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            // Payment Successful
            const plan = PLANS[planId as keyof typeof PLANS];

            // Update User
            await User.findByIdAndUpdate(userId, {
                $inc: { creditBalance: plan.credits },
                $set: { plan: planId }
            });

            res.json({ success: true, message: "Payment verified successfully" });
        } else {
            res.status(400).json({ success: false, message: "Invalid signature" });
        }

    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ success: false, message: 'Failed to verify payment' });
    }
}
