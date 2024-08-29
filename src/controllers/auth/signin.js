import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../models/User.js'

const signin = async (req, res) => {
	const { username, password } = req.body

	try {
		const user = await User.findOne({ where: { username } })

		if (!user || !user instanceof User) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({
					title: ReasonPhrases.NOT_FOUND,
					msg: 'User not exists'
				})
		}

		const match = await bcrypt.compare(password, user.password)

		if (!match) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({
					title: ReasonPhrases.BAD_REQUEST,
					msg: 'Wrong credentials'
				})
		}

		if (user && user instanceof User) {
			const iat = parseInt(new Date() / 1000)

			const token = await jwt.sign(JSON.stringify({
				issuer: 'example',
				_id: user._id,
				username: user.username,
				iat,
				exp: iat + 60 * 60
			}), process.env.JWT_SECRET_KEY)

			return res
				.cookie('access_token', token, {
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'strict',
					maxAge: 1000 * 60 * 60
				})
				.status(StatusCodes.OK)
				.json({
					title: ReasonPhrases.OK,
					msg: 'User found'
				})
		}
	} catch (error) {
		console.error(error)
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({
				title: ReasonPhrases.INTERNAL_SERVER_ERROR,
				msg: ReasonPhrases.INTERNAL_SERVER_ERROR
			})
	}
}

export default signin
