import stylistic from '@stylistic/eslint-plugin'
import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

const eslintConfig = [
	{
		plugins: {
			'@stylistic': stylistic,
			'@next': nextPlugin,
			'react': reactPlugin,
			'react-hooks': reactHooksPlugin,
			'@typescript-eslint': typescriptPlugin,
		},
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		rules: {
			'@stylistic/indent': ['error', 'tab', {
				SwitchCase: 1,
				VariableDeclarator: 'first',
				MemberExpression: 1,
				ArrayExpression: 1,
				ignoredNodes: [
					"TSTypeParameterInstantiation",
				],
			}],
			'@stylistic/brace-style': ['error', '1tbs', {
				allowSingleLine: true,
			}],
			'@stylistic/object-curly-spacing': ['error', 'always', {
				objectsInObjects: true,
			}],
			'@stylistic/jsx-curly-spacing': ['error', {
				when: 'always',
				children: true,
			}],
			'@stylistic/member-delimiter-style': ['error', {
				multiline: {
					delimiter: 'none',
				},
				singleline: {
					delimiter: 'comma',
				},
				multilineDetection: 'brackets',
			}],
			'@stylistic/jsx-one-expression-per-line': 'off',
			'@stylistic/keyword-spacing': ['error', {
				after: true,
				before: true,
				overrides: {
					if: { after: false },
					for: { after: false },
					while: { after: false },
					switch: { after: false },
					catch: { after: false },
				},
			}],
			'@stylistic/comma-dangle': ['error', {
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'only-multiline',
			}],
			'@stylistic/multiline-ternary': ['error', 'always-multiline'],
			'@stylistic/space-infix-ops': 'error',
			'@stylistic/space-unary-ops': ['error', {
				words: true,
				nonwords: false,
				overrides: {
					'!': false,
					'!!': false,
					'+': true,
					'-': true,
				},
			}],
			'@stylistic/quotes': ['error', 'double', { 
				avoidEscape: true,
				allowTemplateLiterals: true 
			}],
			'@stylistic/semi': ['error', 'never'],
			'@stylistic/no-mixed-spaces-and-tabs': 'error',
			'@stylistic/no-trailing-spaces': 'error',
		},
	},
]

export default eslintConfig
