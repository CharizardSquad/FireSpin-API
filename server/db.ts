import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '.env') })

const sequelize = new Sequelize(process.env.DB_URI ?? '', {
  dialect: 'postgres' // Specify PostgreSQL dialect
})

export default sequelize
