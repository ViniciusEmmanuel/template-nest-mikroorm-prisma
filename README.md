## Configuração do typescript

```json
{
  "strict": true, // habilita modo rigoroso; https://www.typescriptlang.org/tsconfig#strict
  "forceConsistentCasingInFileNames": true, // https://www.typescriptlang.org/tsconfig#noImplicitAny
  "noFallthroughCasesInSwitch": true, // https://www.typescriptlang.org/tsconfig#noImplicitAny
  "noUnusedLocals": true, // variáveis não usadas,
  "noUnusedParameters": true, // parâmetros não usados,
  "useDefineForClassFields": true, // faz que class typescript sejam iguais ao javascript (em execução)
  "resolveJsonModule": true // import files.json
}
```

## Eslint

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
```

## Configuração do template

- Baseado em arquitetura hexagonal, onde a proposta é desacoplar o codigo da aplicação de frameworks e facilitar os casos de teste;

  - Videos relacionados:
  - https://www.youtube.com/watch?v=V7JnDDQY1m0
  - https://www.youtube.com/watch?v=M0ODYSahNq8

- Retorno de erros usando padrão Either;

- Uso do padrão Unit of Work para transações com database;
