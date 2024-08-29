import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const signout = (req, res) => {
	res
		.clearCookie()
		.status(StatusCodes.OK)
		.json({
			title: ReasonPhrases.OK,
			msg: 'Session closed'
		})
}

export default signout
