"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Photo = void 0;
var typeorm_1 = require("typeorm");
var Child_model_1 = require("./Child.model");
var Album_model_1 = require("./Album.model");
var Account_model_1 = require("./Account.model");
var Photo = /** @class */ (function () {
    function Photo() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
    ], Photo.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Photo.prototype, "bucketName");
    __decorate([
        (0, typeorm_1.Column)()
    ], Photo.prototype, "objectKey");
    __decorate([
        (0, typeorm_1.Column)()
    ], Photo.prototype, "thumbnailKey");
    __decorate([
        (0, typeorm_1.Column)()
    ], Photo.prototype, "description");
    __decorate([
        (0, typeorm_1.Column)()
    ], Photo.prototype, "dateOfPhoto");
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Photo.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Photo.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Child_model_1.Child; }, function (child) { return child.photos; })
    ], Photo.prototype, "child");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Album_model_1.Album; }, function (album) { return album.photos; })
    ], Photo.prototype, "album");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Account_model_1.Account; }, function (account) { return account.photos; })
    ], Photo.prototype, "account");
    Photo = __decorate([
        (0, typeorm_1.Entity)()
    ], Photo);
    return Photo;
}());
exports.Photo = Photo;
