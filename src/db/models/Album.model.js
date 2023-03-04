"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Album = void 0;
var typeorm_1 = require("typeorm");
var Child_model_1 = require("./Child.model");
var Photo_model_1 = require("./Photo.model");
var Account_model_1 = require("./Account.model");
var Album = /** @class */ (function () {
    function Album() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], Album.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Album.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)()
    ], Album.prototype, "description");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Album.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Album.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Child_model_1.Child; }, function (child) { return child.albums; })
    ], Album.prototype, "child");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Account_model_1.Account; }, function (account) { return account.albums; })
    ], Album.prototype, "account");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Photo_model_1.Photo; }, function (photo) { return photo.album; })
    ], Album.prototype, "photos");
    Album = __decorate([
        (0, typeorm_1.Entity)()
    ], Album);
    return Album;
}());
exports.Album = Album;
