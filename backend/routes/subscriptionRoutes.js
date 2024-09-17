import { Router } from 'express';
import { upgradeSubscription } from '../controllers/subscriptionController.js';

const router = Router();

router.post('/upgrade', upgradeSubscription);

export default router;

