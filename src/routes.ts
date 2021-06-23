import { Router } from "express";
import UserController from "./Controllers/Http/User/UserController";

var routes = Router();

//Inseri 01(um) novo usuário
routes.post("/users", UserController.store);

//busca todos os usuário com filtro
routes.get("/users", UserController.index);

//Atualiza 01(um) user pelo index
routes.put("/users", UserController.update);

//Deleta 01(um) user pelo index
routes.delete("/users", UserController.delete);

export default routes;
