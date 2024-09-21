import { Router } from "express";

import { AuthGithub, authLoginCredentials, CallBackGithub } from "./auth.service.js";

const router = Router();

router.post("/", [], authLoginCredentials);
router.get("/github", AuthGithub);
router.get("/github/callback", CallBackGithub);

export default router;
