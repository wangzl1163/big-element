module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true
	},
	extends: ['eslint:recommended', 'prettier'],
	parser: 'vue-eslint-parser',
	parserOptions: {
		sourceType: 'module'
	},
	rules: {
		indent: ['error', 3],
		'no-tabs': ['error', { allowIndentationTabs: true }]
	}
}
