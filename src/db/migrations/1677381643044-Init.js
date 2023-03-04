"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Init1677381643044 = void 0;
var Init1677381643044 = /** @class */ (function () {
    function Init1677381643044() {
        this.name = 'Init1677381643044';
    }
    Init1677381643044.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("CREATE TABLE \"user\" (\"id\" UUID DEFAULT gen_random_uuid() NOT NULL, \"email\" varchar NOT NULL, \"created_at\" timestamptz NOT NULL DEFAULT now(), \"updated_at\" timestamptz NOT NULL DEFAULT now(), \"account_id\" uuid, CONSTRAINT \"PK_cace4a159ff9f2512dd42373760\" PRIMARY KEY (\"id\"))")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_6acfec7285fdf9f463462de3e9\" ON \"user\" (\"account_id\") ")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"photo\" (\"id\" UUID DEFAULT gen_random_uuid() NOT NULL, \"bucket_name\" varchar NOT NULL, \"object_key\" varchar NOT NULL, \"thumbnail_key\" varchar NOT NULL, \"description\" varchar NOT NULL, \"date_of_photo\" timestamp NOT NULL, \"created_at\" timestamptz NOT NULL DEFAULT now(), \"updated_at\" timestamptz NOT NULL DEFAULT now(), \"child_id\" uuid, \"album_id\" uuid, \"account_id\" uuid, CONSTRAINT \"PK_723fa50bf70dcfd06fb5a44d4ff\" PRIMARY KEY (\"id\"))")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_e20a7909d568260051f092f946\" ON \"photo\" (\"child_id\") ")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_ffd437288f0decc45db033e648\" ON \"photo\" (\"album_id\") ")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_b5a8898edc58430004a66f6862\" ON \"photo\" (\"account_id\") ")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"child\" (\"id\" UUID DEFAULT gen_random_uuid() NOT NULL, \"name\" varchar NOT NULL, \"date_of_birth\" varchar NOT NULL, \"created_at\" timestamptz NOT NULL DEFAULT now(), \"updated_at\" timestamptz NOT NULL DEFAULT now(), \"account_id\" uuid, CONSTRAINT \"PK_4609b9b323ca37c6bc435ec4b6b\" PRIMARY KEY (\"id\"))")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_39cd4ce66d0b0a7728e1226df9\" ON \"child\" (\"account_id\") ")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"album\" (\"id\" UUID DEFAULT gen_random_uuid() NOT NULL, \"name\" varchar NOT NULL, \"description\" varchar NOT NULL, \"created_at\" timestamptz NOT NULL DEFAULT now(), \"updated_at\" timestamptz NOT NULL DEFAULT now(), \"child_id\" uuid, \"account_id\" uuid, CONSTRAINT \"PK_58e0b4b8a31bb897e6959fe3206\" PRIMARY KEY (\"id\"))")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_1bf2b7ed66a63f71b91d857109\" ON \"album\" (\"child_id\") ")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_ea367410f387b9ad69f6605a5a\" ON \"album\" (\"account_id\") ")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"account\" (\"id\" UUID DEFAULT gen_random_uuid() NOT NULL, \"created_at\" timestamptz NOT NULL DEFAULT now(), \"updated_at\" timestamptz NOT NULL DEFAULT now(), CONSTRAINT \"PK_54115ee388cdb6d86bb4bf5b2ea\" PRIMARY KEY (\"id\"))")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"user\" ADD CONSTRAINT \"FK_6acfec7285fdf9f463462de3e9f\" FOREIGN KEY (\"account_id\") REFERENCES \"account\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"photo\" ADD CONSTRAINT \"FK_e20a7909d568260051f092f9461\" FOREIGN KEY (\"child_id\") REFERENCES \"child\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"photo\" ADD CONSTRAINT \"FK_ffd437288f0decc45db033e648f\" FOREIGN KEY (\"album_id\") REFERENCES \"album\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"photo\" ADD CONSTRAINT \"FK_b5a8898edc58430004a66f68625\" FOREIGN KEY (\"account_id\") REFERENCES \"account\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"child\" ADD CONSTRAINT \"FK_39cd4ce66d0b0a7728e1226df96\" FOREIGN KEY (\"account_id\") REFERENCES \"account\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"album\" ADD CONSTRAINT \"FK_1bf2b7ed66a63f71b91d8571098\" FOREIGN KEY (\"child_id\") REFERENCES \"child\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"album\" ADD CONSTRAINT \"FK_ea367410f387b9ad69f6605a5a5\" FOREIGN KEY (\"account_id\") REFERENCES \"account\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 19:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Init1677381643044.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"album\" DROP CONSTRAINT \"FK_ea367410f387b9ad69f6605a5a5\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"album\" DROP CONSTRAINT \"FK_1bf2b7ed66a63f71b91d8571098\"")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"child\" DROP CONSTRAINT \"FK_39cd4ce66d0b0a7728e1226df96\"")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"photo\" DROP CONSTRAINT \"FK_b5a8898edc58430004a66f68625\"")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"photo\" DROP CONSTRAINT \"FK_ffd437288f0decc45db033e648f\"")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"photo\" DROP CONSTRAINT \"FK_e20a7909d568260051f092f9461\"")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"user\" DROP CONSTRAINT \"FK_6acfec7285fdf9f463462de3e9f\"")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"account\"")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"album\"@\"IDX_ea367410f387b9ad69f6605a5a\" CASCADE")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"album\"@\"IDX_1bf2b7ed66a63f71b91d857109\" CASCADE")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"album\"")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"child\"@\"IDX_39cd4ce66d0b0a7728e1226df9\" CASCADE")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"child\"")];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"photo\"@\"IDX_b5a8898edc58430004a66f6862\" CASCADE")];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"photo\"@\"IDX_ffd437288f0decc45db033e648\" CASCADE")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"photo\"@\"IDX_e20a7909d568260051f092f946\" CASCADE")];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"photo\"")];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX \"user\"@\"IDX_6acfec7285fdf9f463462de3e9\" CASCADE")];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"user\"")];
                    case 19:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Init1677381643044;
}());
exports.Init1677381643044 = Init1677381643044;
