import { Model, DataTypes, BelongsToManyAddAssociationMixin, BelongsToManyHasAssociationMixin } from 'sequelize'
import sequelize from '../db'
import API from './API'

class User extends Model {
  public id!: string
  public username!: string
  public password!: string

  declare addAPI: BelongsToManyAddAssociationMixin<API, number>
  declare hasAPI: BelongsToManyHasAssociationMixin<API, number>
}

User.init({
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize })

export default User
