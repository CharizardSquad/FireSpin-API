import { Model, DataTypes, HasManyGetAssociationsMixin } from 'sequelize'
import sequelize from '../db'
import ResponseTime from './ResponseTime'

class API extends Model {
  public id!: string
  public url!: string
  declare getResponseTimes: HasManyGetAssociationsMixin<ResponseTime>
}

API.init({
  // Model attributes are defined here
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize })

export default API
