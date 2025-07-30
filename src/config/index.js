import dotenv from 'dotenv';
dotenv.config();

export const {
  PORT,
  DATABASE_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SESSION_SECRET,
  INFURA_PROJECT_ID
} = process.env;
