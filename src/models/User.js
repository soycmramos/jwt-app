import { randomUUID } from 'node:crypto'
import sequelize from '../database/pool.js'
import { DataTypes } from 'sequelize'

const User = sequelize.define('User', {
	_id: {
		primaryKey: true,
		type: DataTypes.STRING.BINARY,
		allowNull: false,
		defaultValue: randomUUID()
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
})

export default User
