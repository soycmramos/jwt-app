import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { randomUUID } from 'node:crypto'
import bcrypt from 'bcrypt'
import User from '../../models/User.js'

const signup = async (req, res) => {
	const { username, password } = req.body
	const _id = randomUUID()

	try {
		let result = await User.findOne({ where: { username } })

		if (result && result instanceof User) {
			return res
				.status(StatusCodes.CONFLICT)
				.json({
					title: ReasonPhrases.CONFLICT,
					msg: 'User already exists'
				})
		}

		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)

		result = await User.create({ _id, username, password: hash })

		if (result instanceof User) {
			return res
				.status(StatusCodes.CREATED)
				.json({
					title: ReasonPhrases.CREATED,
					msg: 'New user created'
				})
		}
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({
				title: ReasonPhrases.INTERNAL_SERVER_ERROR,
				msg: ReasonPhrases.INTERNAL_SERVER_ERROR
			})
	}
}

export default signup
