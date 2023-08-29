import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

class API extends Model {}

API.init({
  // Model attributes are defined here
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize });

export default API;
