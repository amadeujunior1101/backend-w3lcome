import { Response } from "express";
import { User } from "../Types/User";

const UserValidator = (user: User, res: Response) => {
  if (user.name === "") return res.json({ name: "required" });
  else if (user.email === "") return res.json({ email: "required" });
  else if (user.pictureUrl === "") return res.json({ pictureUrl: "required" });
  else return false;
};

export default UserValidator;
