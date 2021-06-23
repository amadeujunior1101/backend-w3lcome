import { Request, Response } from "express";

import userValidator from "../../../Validators/UserValidator";
import { User } from "../../../Types/User";

let arrayPeoples: Array<User> = [];

export default {
  async index(req: Request, res: Response) {
    const { page, limit } = req.query;

    let result = [];

    let totalPage = Math.ceil(arrayPeoples.length / Number(limit));

    let count = Number(page) * Number(limit) - Number(limit);

    let delimiter = count + Number(limit);

    if (Number(page) <= totalPage) {
      for (let i = count; i < delimiter; i++) {
        if (arrayPeoples[i] != null) {
          result.push(arrayPeoples[i]);
        }
        count++;
      }
    }

    return res.status(200).json({
      "actual page": Number(page),
      "items per page": Number(limit),
      "total pages": totalPage,
      users: result,
    });
  },

  async store(req: Request, res: Response) {
    const { name, email, pictureUrl } = req.body;

    const user = {
      name: name,
      email: email,
      pictureUrl: pictureUrl,
    };

    userValidator(user, res) !== false && userValidator(user, res);

    try {
      let emailExist = arrayPeoples.find((item) => {
        return item.email === user.email;
      });

      if (emailExist)
        return res.status(400).json({
          message: "E-mail already registered.",
          user: "E-mail já cadastrado.",
        });

      arrayPeoples.push(user);

      return res.status(200).json({
        message: "successfully registered",
        user: user,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ error: error, message: "Registration failed" });
    }
  },

  async update(req: Request, res: Response) {
    const { name, email, pictureUrl } = req.body;

    let userExist = arrayPeoples.filter((item) => {
      return item.email === email;
    });

    if (userExist.length === 0)
      return res.status(400).json({
        message: "User not found.",
        users: [],
      });

    let newArrayPeoples = arrayPeoples;

    let updateUser = newArrayPeoples.filter((item) => {
      return item.email === email;
    });

    updateUser[0].name = name;
    updateUser[0].email = email;
    updateUser[0].pictureUrl = pictureUrl;

    return res.json({ updateUser: updateUser });
  },

  async delete(req: Request, res: Response) {
    const { index } = req.query;

    let deleteUser = arrayPeoples.filter((item, index_) => {
      return Number(index) === index_;
    });

    if (deleteUser.length === 0)
      return res.status(400).json({
        message: "User not found.",
        users: [],
      });

    try {
      if (Number(index) > -1) {
        arrayPeoples.splice(Number(index), 1);
      }

      return res.status(200).json({
        message: "user deleted successfully",
        users: arrayPeoples,
      });
    } catch (error) {
      return res.status(400).json({ error: "deleted failed" });
    }
  },
};
