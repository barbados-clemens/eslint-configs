const nx = require('@nx/eslint-plugin');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tseslint = require('typescript-eslint');

// Note: detected a parser other than @typescript-eslint/parser.
// Make sure the parser is configured to forward "parserOptions.project" to @typescript-eslint/parser.
/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...tseslint.configs.stylisticTypeChecked.map((c) => ({
    ...c,
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      '@typescript-eslint/no-empty-function': 'warn',
    },
  })),
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
];
