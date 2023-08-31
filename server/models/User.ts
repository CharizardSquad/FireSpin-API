import { Model, DataTypes, type BelongsToManyAddAssociationMixin, type BelongsToManyHasAssociationMixin, type BelongsToManyGetAssociationsMixin, type BelongsToManyRemoveAssociationMixin } from 'sequelize'
import sequelize from '../db'
import type API from './API'

class User extends Model {
  public id!: string
  public username!: string
  public password!: string

  declare addAPI: BelongsToManyAddAssociationMixin<API, number>
  declare hasAPI: BelongsToManyHasAssociationMixin<API, number>
  declare getAPIs: BelongsToManyGetAssociationsMixin<API>
  declare removeAPI: BelongsToManyRemoveAssociationMixin<API, number>
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
