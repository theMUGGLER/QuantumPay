import { Invoice } from '../models';
import { deriveAddress } from '../services/paymentService';

export async function createInvoice(req, res) {
  const { quantity } = req.body;
  if (!quantity || quantity <= 0) return res.status(400).json({ error: 'Invalid quantity' });

  const pricePer = 0.05;
  const amount = (pricePer * quantity).toFixed(8);

  const inv = await Invoice.create({
    merchantId: req.merchant.id,
    quantity,
    amount,
    address: '',
    expiresAt: new Date(Date.now() + 15 * 60 * 1000)
  });
  inv.address = deriveAddress(req.merchant.xpub, inv.id);
  await inv.save();

  res.status(201).json(inv);
}

export async function getInvoice(req, res) {
  const inv = await Invoice.findOne({ where: { id: req.params.id, merchantId: req.merchant.id } });
  if (!inv) return res.status(404).json({ error: 'Not found' });
  res.json(inv);
}
