import { HDNode, providers, utils } from 'ethers';
import { Invoice } from '../models';
import { INFURA_PROJECT_ID } from '../config';

const provider = new providers.InfuraProvider('homestead', INFURA_PROJECT_ID);

export function deriveAddress(xpub, index) {
  const node = HDNode.fromExtendedKey(xpub).derivePath(`m/44'/60'/0'/0/${index}`);
  return node.address;
}

export async function checkPayments() {
  const pending = await Invoice.findAll({ where: { status: 'pending' }, include: 'Merchant' });
  for (const inv of pending) {
    if (inv.expiresAt < new Date()) {
      inv.status = 'expired';
      await inv.save();
      continue;
    }
    const bal = parseFloat(utils.formatEther(await provider.getBalance(inv.address)));
    if (bal >= parseFloat(inv.amount)) {
      inv.status = 'paid';
      inv.paidAt = new Date();
      await inv.save();
      console.log(`Invoice ${inv.id} paid`);
    }
  }
}
