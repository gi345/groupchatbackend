import express from 'express';
import { sendOTP } from '../controllers/otpController.js'; // Ensure correct import

const router = express.Router();

router.post('/send-otp', sendOTP);

export default router; // Export as default
