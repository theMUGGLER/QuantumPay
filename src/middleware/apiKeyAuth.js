import { Merchant } from '../models';

export default async function apiKeyAuth(req, res, next) {
  const key = req.header('x-api-key');
  if (!key) return res.status(401).json({ error: 'No API key' });
  const merchant = await Merchant.findOne({ where: { apiKey: key } });
  if (!merchant) return res.status(403).json({ error: 'Invalid API key' });
  req.merchant = merchant;
  next();
}
