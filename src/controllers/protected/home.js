import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

const home = (req, res) => {
	const token = req.cookies.access_token
	if (!token) return res.render('index', 'Home')

	try {
		const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
		return res.render('home', {title: 'Home', ...data})
	} catch (error) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({
				title: ReasonPhrases.UNAUTHORIZED,
				msg: 'Protected route'
			})
	}
}

export default home
