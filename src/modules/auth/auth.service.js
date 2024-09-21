import axios from "axios";
import { request, response } from "express";
import UserModel from "../users/entity/index.js";
import bcryptjs from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const authLoginCredentials = async (req, resp) => {
  const { email, password } = req.body;

  console.log("data");
  console.log(email, password);
  const foundUser = await UserModel.findOne({
    where: {
      email,
    },
  });

  //validacion

  const match = await bcryptjs.compareSync(password, foundUser.password);

  if (!match) {
    return resp.status(401).json({ message: "Credenciales incorrectas" });
  }

  //crear tokens

  const token = jsonwebtoken.sign(
    { id: foundUser.dataValues.id },
    process.env.SECRET_TOKEN
  );

  const responseData = {
    token,
    user: foundUser.toJSON(),
  };
  console.log(token);
  return resp.json(responseData);
};

const AuthGithub = async (req = request, res = response) => {
  try {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    );
  } catch (err) {
    console.log(err);
  }
};

const CallBackGithub = async (req = request, res = response) => {
  try {
    const { code } = req.query;

    const body = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    };

    const options = { headers: { accept: "application/json" } };

    const { data } = await axios.post(
      `https://github.com/login/oauth/access_token`,
      body,
      options
    );

    const { data: dataUser } = await axios.get(`https://api.github.com/user`, {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });
    console.log(dataUser);

    if (dataUser) {
      //consulta si el usuario existe con el id de github

      //si existe generar jwt

      //si no existe crear usuario

      const existUserGithub = await UserModel.findOne({
        where: {
          githubId: dataUser.id,
        },
      });

      console.log("data?", existUserGithub);
      if (!existUserGithub) {
        //creacion de usuario
      } else {
        login;
      }
    }
  } catch (err) {
    console.log(err);
  }
};
export { AuthGithub, CallBackGithub, authLoginCredentials };
