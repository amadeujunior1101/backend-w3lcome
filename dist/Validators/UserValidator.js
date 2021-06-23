"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserValidator = function (user, res) {
    if (user.name === "")
        return res.json({ name: "required" });
    else if (user.email === "")
        return res.json({ email: "required" });
    else if (user.pictureUrl === "")
        return res.json({ pictureUrl: "required" });
    else
        return false;
};
exports.default = UserValidator;
