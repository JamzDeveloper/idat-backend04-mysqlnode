import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import path, { dirname, join } from "node:path";

import express from "express";
import { Server as SocketServer } from "socket.io";
import sequelize from "../config/db/index.js";

import usersRouter from "../modules/users/routes/index.js";
import authRouter from "../modules/auth/routes.js";
import stripePath from "../services/stripe/routes/index.js";

class Server {
  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    this.__dirname = dirname(__filename);

    this.port = process.env.PORT || 3000;
    this.app = express();
    this.server = createServer(this.app);
    this.io = new SocketServer(this.server);

    this.userPath = "/api/users";
    this.authPath = "/api/auth";
    this.stripePath = "/api/stripe";

    //Middlewares

    this.middlewares();
    //Rutas de mi aplicacion

    this.routes();
    //base de datos
    this.connectDb();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.static(path.join(this.__dirname, "../public/")));
  }

  connectDb = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

  routes() {
    this.app.use(this.userPath, usersRouter);
    this.app.use(this.authPath, authRouter);
    this.app.use(this.stripePath, stripePath);
  }

  socket() {
    this.io.on("connection", (socket) => {
      console.log("a user connected");
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });

      socket.on("chat message", (data) => {
        if (data.message.includes("@meta")) {
          //pedido a openIA
          data.message = "soy un bot";
          data.username = "OpenIA";
        }

        //guardan en el modelo de messages

        console.log("message: " + data);

        io.emit("chat response", data);
      });
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}
export default Server;
