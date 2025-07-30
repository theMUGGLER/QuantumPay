import { Invoice } from '../models';

export async function renderEmbed(req, res) {
  const invoice = await Invoice.findByPk(req.params.id);
  if (!invoice) return res.status(404).send('Invoice not found');
  if (req.query.json != null) {
    return res.json(invoice);
  }
  res.render('embed', { invoice });
}
