"use strict";
var _a;
exports.__esModule = true;
exports.options = void 0;
var dotenv = require("dotenv");
dotenv.config();
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
exports.options = {
    type: 'cockroachdb',
    host: process.env.DB_HOST,
    port: parseInt((_a = process.env.DB_PORT) !== null && _a !== void 0 ? _a : '26257'),
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: false,
    ssl: {
        ca: process.env.SSL_CERT
    },
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    entities: [__dirname + '/**/models/**/*.model.{js,ts}'],
    migrations: [__dirname + '/**/migrations/*.{js,ts}'],
    timeTravelQueries: false
};
var dataSource = new typeorm_1.DataSource(exports.options);
exports["default"] = dataSource;
