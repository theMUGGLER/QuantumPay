import express from 'express';
import ensureAuth from '../middleware/ensureAuth';
import { renderDashboard, saveXpub, logout } from '../controllers/merchantController';
import { renderEmbed } from '../controllers/embedController';

const router = express.Router();
router.get('/dashboard', ensureAuth, renderDashboard);
router.post('/dashboard/xpub', ensureAuth, saveXpub);
router.post('/logout', ensureAuth, logout);
router.get('/embed/:id', renderEmbed);
export default router;
