import { Model, DataTypes } from 'sequelize'
import sequelize from '../db'

class ResponseTime extends Model {
  public id!: string
  public time!: number
  public APIId!: string
}

ResponseTime.init({
  // Model attributes are defined here
  time: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  APIId: {
    type: DataTypes.NUMBER,
    allowNull: false
  }
}, { sequelize })

export default ResponseTime
