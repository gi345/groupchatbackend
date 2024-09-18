import { Router } from 'express';
import { upgradeSubscription,  getSubscriptionPlans } from '../controllers/subscriptionController.js';

const router = Router();

router.post('/upgrade', upgradeSubscription);

router.get('/subscription-plans', getSubscriptionPlans);

export default router;

