/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,pug}"],
	theme: {
		fontFamily: {
			sans: ['Poppins', 'system-ui', 'sans-serif']
		},
		extend: {
			spacing: {
				'header-height': '4rem'
			},
			colors: {
				'bg-body': '#f0f2f5',
				'text-color': '#404145'
			}
		},
	},
	plugins: [],
}
