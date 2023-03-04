"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Account = void 0;
var typeorm_1 = require("typeorm");
var User_model_1 = require("./User.model");
var Album_model_1 = require("./Album.model");
var Photo_model_1 = require("./Photo.model");
var Child_model_1 = require("./Child.model");
var Account = /** @class */ (function () {
    function Account() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], Account.prototype, "id");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Account.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Account.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return User_model_1.User; }, function (user) { return user.account; })
    ], Account.prototype, "users");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Album_model_1.Album; }, function (album) { return album.account; })
    ], Account.prototype, "albums");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Photo_model_1.Photo; }, function (photo) { return photo.account; })
    ], Account.prototype, "photos");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Child_model_1.Child; }, function (child) { return child.account; })
    ], Account.prototype, "children");
    Account = __decorate([
        (0, typeorm_1.Entity)()
    ], Account);
    return Account;
}());
exports.Account = Account;
