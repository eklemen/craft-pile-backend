"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Child = void 0;
var typeorm_1 = require("typeorm");
var Album_model_1 = require("./Album.model");
var Photo_model_1 = require("./Photo.model");
var Account_model_1 = require("./Account.model");
var Child = /** @class */ (function () {
    function Child() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], Child.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Child.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)()
    ], Child.prototype, "dateOfBirth");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Child.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Child.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Album_model_1.Album; }, function (album) { return album.child; })
    ], Child.prototype, "albums");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Photo_model_1.Photo; }, function (photo) { return photo.child; })
    ], Child.prototype, "photos");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Account_model_1.Account; }, function (account) { return account.children; })
    ], Child.prototype, "account");
    Child = __decorate([
        (0, typeorm_1.Entity)()
    ], Child);
    return Child;
}());
exports.Child = Child;
