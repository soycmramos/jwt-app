import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { Sequelize } from 'sequelize'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: join(__dirname, 'database.sqlite')
})

export default sequelize
