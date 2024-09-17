import { Router } from 'express';
import { createGroup, inviteUser, searchGroups } from '../controllers/groupController.js';

const router = Router();

router.post('/create', createGroup);
router.post('/invite', inviteUser);
router.get('/search', searchGroups);

export default router;