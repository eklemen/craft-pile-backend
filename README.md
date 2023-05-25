## Generate migration
```shell
npx typeorm-ts-node-commonjs migration:generate ./src/db/migrations/Init -d ./src/db/datasource.ts
```

## Run migration
```shell
npx typeorm-ts-node-esm migration:run -d ./src/db/datasource.ts
```

## Generate types from gql
```shell
yarn generate
``` 


## Updating secrets
* Update azure_deploy.yml
* Update secrets in github action
