import { Model, DataTypes } from 'sequelize'
import sequelize from '../db'

class ResponseTime extends Model {
  public id!: string
  public time!: number
  public APIId!: number
  public UserId!: number
}

ResponseTime.init({
  // Model attributes are defined here
  time: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  APIId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { sequelize })

export default ResponseTime
