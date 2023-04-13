## Generate migration
npx typeorm-ts-node-commonjs migration:generate ./src/db/migrations/Init -d ./src/db/datasource.ts

## Run migration
npx typeorm-ts-node-esm migration:run -d ./src/db/datasource.ts

## Generate types from gql
ts-node generate-types-from-gql
