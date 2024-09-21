import { Router } from "express";
import StripeController from "../controllers/index.js";

const stripeService = new StripeController();
const StripeRouter = Router();

StripeRouter.post("/customer", stripeService.createCustomer);
StripeRouter.post("/prices", stripeService.createPrice);
StripeRouter.post("/products", stripeService.createProduct);
StripeRouter.post("/payments", stripeService.createSessionPayment);

export default StripeRouter;
