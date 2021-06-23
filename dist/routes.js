"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = __importDefault(require("./Controllers/Http/User/UserController"));
var routes = express_1.Router();
//Inseri 01(um) novo usuário
routes.post("/users", UserController_1.default.store);
//busca todos os usuário com filtro
routes.get("/users", UserController_1.default.index);
//Atualiza 01(um) user pelo index
routes.put("/users", UserController_1.default.update);
//Deleta 01(um) user pelo index
routes.delete("/users", UserController_1.default.delete);
exports.default = routes;
