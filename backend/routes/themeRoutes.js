import { Router } from 'express';
import { getTheme, sendOtp } from '../controllers/themeController.js';

const router = Router();

router.get('/theme', getTheme);
router.post('/send-otp', sendOtp);

export default router;
