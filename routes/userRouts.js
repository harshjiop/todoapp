import express from "express";
import { home, login, profile, register } from "../controllers/userController.js";
// import Auth from "../middlewares/auth.js";
const router = express.Router();
router.route('/').get(home);
router.route('/api/u1/register').post(register);
router.route('/api/u1/login').post(login);
router.route('/api/u1/my-profile').post(profile);

// router.get("/", home);


export default router;
