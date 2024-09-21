import { request } from "express";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

import UserModel from "../entity/index.js";

const createUser = async (req = request, resp) => {
  const { firstName, lastName, password, email } = req.body;

  //validacion de usuario si existe
  //   UserModel.findOne({ email, username });

  const salt = await bcrypt.genSalt(10);

  const newPassword = await bcrypt.hash(password, salt);

  const newUser = await UserModel.create({
    firstName,
    lastName,
    password: newPassword,
    email,
  });
  await newUser.save();

  const token = jsonwebtoken.sign(
    { id: newUser.dataValues.id },
    process.env.SECRET_TOKEN
  );

  return resp.json({ user: newUser, token });
};

const listUser = async (req = request, resp) => {
  const users = await UserModel.findAll();

  resp.json(users);
};
export { createUser, listUser };
