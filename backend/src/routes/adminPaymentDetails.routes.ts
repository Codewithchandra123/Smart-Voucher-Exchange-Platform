import express from 'express';
import { getPaymentDetails, updatePaymentDetails } from '../controllers/adminPaymentDetails.controller';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

// Public route to get details (for users to see where to pay)
router.get('/', getPaymentDetails);

// Admin route to update details
router.put('/', protect, admin, updatePaymentDetails);

export default router;
