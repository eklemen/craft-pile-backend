"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var path_1 = require("path");
var auth_module_1 = require("./auth/auth.module");
var graphql_1 = require("@nestjs/graphql");
var config_1 = require("@nestjs/config");
var typeorm_1 = require("@nestjs/typeorm");
var apollo_1 = require("@nestjs/apollo");
var user_module_1 = require("./user/user.module");
var datasource_1 = require("./db/datasource");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true
                }),
                auth_module_1.AuthModule,
                typeorm_1.TypeOrmModule.forRoot(datasource_1.options),
                graphql_1.GraphQLModule.forRoot({
                    driver: apollo_1.ApolloDriver,
                    typePaths: ['./**/*.graphql'],
                    definitions: {
                        path: (0, path_1.join)(process.cwd(), 'src/graphql.ts'),
                        emitTypenameField: true
                    },
                    playground: true
                }),
                user_module_1.UserModule,
            ],
            controllers: [],
            providers: []
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
