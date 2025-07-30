import express from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import { SESSION_SECRET, PORT } from './config';
import { initDB } from './models';
import apiRoutes from './routes/api';
import authRoutes from './routes/auth';
import webRoutes from './routes/web';
import { checkPayments } from './services/paymentService';

async function main() {
  await initDB();

  const app = express();
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/api', apiRoutes);
  app.use('/auth', authRoutes);
  app.use('/', webRoutes);

  setInterval(checkPayments, 60 * 1000);

  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

main();
