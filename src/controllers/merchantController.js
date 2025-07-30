import { Invoice } from '../models';

export async function renderDashboard(req, res) {
  const merchant = req.user;
  const invoices = await Invoice.findAll({ where: { merchantId: merchant.id } });
  res.render('dashboard', { merchant, invoices });
}

export async function saveXpub(req, res) {
  req.user.xpub = req.body.xpub;
  await req.user.save();
  res.redirect('/dashboard');
}

export function logout(req, res) {
  req.logout();
  res.redirect('/');
}
