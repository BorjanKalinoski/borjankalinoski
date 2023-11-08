module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:svelte/recommended',
		'canonical/auto',
		'canonical/browser',
		'canonical/module',
		'canonical/typescript-type-checking',
		'canonical/zod'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
		project: './tsconfig.json',
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		'no-negated-condition': 'off',
		'func-style': 'off',
		'@typescript-eslint/unbound-method': "off",
		'node/no-callback-literal': "off",
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				fixStyle: 'inline-type-imports',
			},
		],
		'@typescript-eslint/no-import-type-side-effects': 'error',
		'canonical/prefer-inline-type-import': 'off',
		"import/no-named-as-default": 'off',
		'node/callback-return':'off',
		'@typescript-eslint/no-throw-literal': 'off',
		"require-atomic-updates": "off"
	}
};
