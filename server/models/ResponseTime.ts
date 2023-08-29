import { Model, DataTypes } from 'sequelize'
import sequelize from '../db'

class ResponseTime extends Model {}

ResponseTime.init({
  // Model attributes are defined here
  time: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { sequelize })

export default ResponseTime
