import express from 'express';
import passport from 'passport';
import '../controllers/googleAuth';

const router = express.Router();
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect('/dashboard')
);
export default router;
