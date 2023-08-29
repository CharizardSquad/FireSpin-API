import { Model, DataTypes } from 'sequelize'
import sequelize from '../db'

class User extends Model {
  public id!: string
  public username!: string
  public password!: string
}

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
}, { sequelize })

export default User
