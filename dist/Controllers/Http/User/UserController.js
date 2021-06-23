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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserValidator_1 = __importDefault(require("../../../Validators/UserValidator"));
var arrayPeoples = [];
exports.default = {
    index: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, limit, result, totalPage, count, delimiter, i;
            return __generator(this, function (_b) {
                _a = req.query, page = _a.page, limit = _a.limit;
                result = [];
                totalPage = Math.ceil(arrayPeoples.length / Number(limit));
                count = Number(page) * Number(limit) - Number(limit);
                delimiter = count + Number(limit);
                if (Number(page) <= totalPage) {
                    for (i = count; i < delimiter; i++) {
                        if (arrayPeoples[i] != null) {
                            result.push(arrayPeoples[i]);
                        }
                        count++;
                    }
                }
                return [2 /*return*/, res.status(200).json({
                        "actual page": Number(page),
                        "items per page": Number(limit),
                        "total pages": totalPage,
                        users: result,
                    })];
            });
        });
    },
    store: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, pictureUrl, user, emailExist;
            return __generator(this, function (_b) {
                _a = req.body, name = _a.name, email = _a.email, pictureUrl = _a.pictureUrl;
                user = {
                    name: name,
                    email: email,
                    pictureUrl: pictureUrl,
                };
                UserValidator_1.default(user, res) !== false && UserValidator_1.default(user, res);
                try {
                    emailExist = arrayPeoples.find(function (item) {
                        return item.email === user.email;
                    });
                    if (emailExist)
                        return [2 /*return*/, res.status(400).json({
                                message: "E-mail already registered.",
                                user: "E-mail já cadastrado.",
                            })];
                    arrayPeoples.push(user);
                    return [2 /*return*/, res.status(200).json({
                            message: "successfully registered",
                            user: user,
                        })];
                }
                catch (error) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ error: error, message: "Registration failed" })];
                }
                return [2 /*return*/];
            });
        });
    },
    update: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, pictureUrl, userExist, newArrayPeoples, updateUser;
            return __generator(this, function (_b) {
                _a = req.body, name = _a.name, email = _a.email, pictureUrl = _a.pictureUrl;
                userExist = arrayPeoples.filter(function (item) {
                    return item.email === email;
                });
                if (userExist.length === 0)
                    return [2 /*return*/, res.status(400).json({
                            message: "User not found.",
                            users: [],
                        })];
                newArrayPeoples = arrayPeoples;
                updateUser = newArrayPeoples.filter(function (item) {
                    return item.email === email;
                });
                updateUser[0].name = name;
                updateUser[0].email = email;
                updateUser[0].pictureUrl = pictureUrl;
                return [2 /*return*/, res.json({ updateUser: updateUser })];
            });
        });
    },
    delete: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var index, deleteUser;
            return __generator(this, function (_a) {
                index = req.query.index;
                deleteUser = arrayPeoples.filter(function (item, index_) {
                    return Number(index) === index_;
                });
                if (deleteUser.length === 0)
                    return [2 /*return*/, res.status(400).json({
                            message: "User not found.",
                            users: [],
                        })];
                try {
                    if (Number(index) > -1) {
                        arrayPeoples.splice(Number(index), 1);
                    }
                    return [2 /*return*/, res.status(200).json({
                            message: "user deleted successfully",
                            users: arrayPeoples,
                        })];
                }
                catch (error) {
                    return [2 /*return*/, res.status(400).json({ error: "deleted failed" })];
                }
                return [2 /*return*/];
            });
        });
    },
};
