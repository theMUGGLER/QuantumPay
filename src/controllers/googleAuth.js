import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../config';
import { Merchant } from '../models';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let merchant = await Merchant.findOne({ where: { googleId: profile.id } });
    if (!merchant) {
      merchant = await Merchant.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName
      });
    }
    done(null, merchant);
  } catch (err) {
    done(err);
  }
}));

passport.serializeUser((merchant, done) => done(null, merchant.id));
passport.deserializeUser(async (id, done) => {
  try {
    const merchant = await Merchant.findByPk(id);
    done(null, merchant);
  } catch (err) {
    done(err);
  }
});
