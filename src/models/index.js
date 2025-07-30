import { Sequelize } from 'sequelize';
import { DATABASE_URL } from '../config';

export const sequelize = new Sequelize(DATABASE_URL, { dialect: 'postgres', logging: false });

import MerchantModel from './Merchant';
import InvoiceModel from './Invoice';

export const Merchant = MerchantModel(sequelize);
export const Invoice = InvoiceModel(sequelize);

Merchant.hasMany(Invoice, { foreignKey: 'merchantId' });
Invoice.belongsTo(Merchant, { foreignKey: 'merchantId' });

export async function initDB() {
  await sequelize.authenticate();
  await sequelize.sync();
}
