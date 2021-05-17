module.exports = {
	'env': {
		'browser': true,
	'es2020': true,
	'node': true
	},
	'extends': [
		'plugin:react/recommended',
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 11,
		'sourceType': 'module'
	},
	'plugins': [
		'react'
	],
	'rules': {
		'semi': ['error', 'never'],
		'quotes': ['warn', 'single'],
		'no-var': 'warn',
		'no-new-object': 'warn',
		'object-shorthand': 'warn',
		'no-array-constructor': 'warn',
		'prefer-destructuring': 'warn',
		'prefer-template': 'warn',
		'template-curly-spacing': 'warn',
		'no-eval': 'error',
		'no-useless-escape': 'warn',
		'space-before-blocks': 'warn',
		'prefer-arrow-callback': 'warn',
		'arrow-spacing': 'warn',
		'arrow-parens': ['warn', 'as-needed'],
		'arrow-body-style': ['warn', 'as-needed'],
		'no-confusing-arrow': 'warn',
		'implicit-arrow-linebreak': 'warn',
		'no-dupe-class-members': 'warn',
		'no-duplicate-imports': 'warn',
		'dot-notation': 'warn',
		'no-restricted-properties': 'warn',
		'no-multi-assign': 'warn',
		'operator-linebreak': 'warn',
		'no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
		'no-console': 'warn'
	}
}
