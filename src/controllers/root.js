import jwt from 'jsonwebtoken'

const root = (req, res) => {
	const token = req.cookies.access_token
	if (!token) return res.render('index', { title: 'Sign In | Sign Up' })

	try {
		const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
		return res.render('index', data)
	} catch (error) {
		return res.render('index')
	}
}

export default root
