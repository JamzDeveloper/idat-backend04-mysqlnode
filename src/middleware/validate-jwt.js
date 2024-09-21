import jsonwebtoken from "jsonwebtoken";
import UserModel from "../modules/users/entity/index.js";
import dotenv from 'dotenv';
dotenv.config();

const validateJwt = async (req, resp, next) => {
  try {
    console.log(req.headers.authorization)
    if (!req.headers.authorization) {
      return resp.status(401).json({
        message: "Accesso denegado",
      });
    }

    const token = req.headers.authorization.split(" ");
    const decoded = jsonwebtoken.decode(token[1], process.env.SECRET_TOKEN);

    console.log(decoded)
    const userFound = await UserModel.findByPk(decoded.id);

    console.log(userFound)
    if (!userFound) {
      return resp.status(401).json({
        message: "Accesso denegado",
      });
    }

    next();
  } catch (err) {}
};

export default validateJwt;
