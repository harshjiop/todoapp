import express from "express";
import Auth from "../middlewares/auth.js";

import {
  AddNewTask,
  todohome,
  todoregister,
} from "../controllers/todoControllers.js";

const router = express.Router();

router.route("/").get(todohome);
router.route("/api/u1/register").post(Auth, todoregister);
// router.route('/api/u1/login').post(login);
// router.route('/api/u1/my-profile').post(profile);

// router.get("/", home);

export default router;
