import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

class User extends Model {}

User.init({
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize });

export default User;
