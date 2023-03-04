"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var jwt_1 = require("@nestjs/jwt");
var passport_1 = require("@nestjs/passport");
var local_strategy_1 = require("./local.strategy");
var user_module_1 = require("../user/user.module");
var config_1 = require("@nestjs/config");
var jwt_strategy_1 = require("./jwt.strategy");
var auth_resolver_1 = require("./auth.resolver");
var auth_service_1 = require("./auth.service");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Module)({
            imports: [
                user_module_1.UserModule,
                passport_1.PassportModule,
                jwt_1.JwtModule.registerAsync({
                    useFactory: function (config) {
                        return {
                            secret: config.get('JWT_SECRET_KEY'),
                            signOptions: {
                                expiresIn: '7d'
                            }
                        };
                    },
                    inject: [config_1.ConfigService]
                }),
            ],
            providers: [local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy, auth_service_1.AuthService, auth_resolver_1.AuthResolver],
            exports: [auth_service_1.AuthService]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
