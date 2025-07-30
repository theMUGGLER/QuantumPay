import { DataTypes } from 'sequelize';
import crypto from 'crypto';

export default (sequelize) => {
  const Merchant = sequelize.define('Merchant', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    googleId: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    name: { type: DataTypes.STRING },
    xpub: { type: DataTypes.STRING },
    apiKey: {
      type: DataTypes.STRING,
      defaultValue: () => crypto.randomBytes(16).toString('hex')
    }
  });
  return Merchant;
};
