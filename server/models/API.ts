import { Model, DataTypes } from 'sequelize'
import sequelize from '../db'

class API extends Model {
  public id!: string
  public url!: string
}

API.init({
  // Model attributes are defined here
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize })

export default API
