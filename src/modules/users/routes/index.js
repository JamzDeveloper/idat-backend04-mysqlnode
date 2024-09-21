import { Router } from "express";
import { createUser, listUser } from "../controllers/index.js";
import validateJwt from "../../../middleware/validate-jwt.js";
import { check } from "express-validator";
import validateFields from "../../../middleware/validate-field.js";

const usersRouter = Router();

usersRouter.post(
  "/",
  [
    check("firstName", "FirstName is required").not().isEmpty(),
    check("email", "invalid email").isEmail(),
    check("password", "password is required").not().isEmpty(),
    validateFields,
  ],
  createUser
);
usersRouter.get("/", validateJwt, listUser);

export default usersRouter;

/**
 * import { Router } from "express";

const UsersRouter = Router();

export default UsersRouter;

 */
