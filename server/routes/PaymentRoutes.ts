import express from 'express';
import { createOrder, verifyPayment } from '../controllers/PaymentController.js';

const PaymentRouter = express.Router();

PaymentRouter.post('/create-order', createOrder);
PaymentRouter.post('/verify-payment', verifyPayment);

export default PaymentRouter;
