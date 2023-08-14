import User from "../models/usermodels.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,

  // httpOnly: true,
  // secure: true,
};
const home = (req, res) => {
  res.send("this is home Page");
};
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const UserExists = await User.findOne({ email });
    if (UserExists) {
      return res
        .status(400)
        .json({ msg: "This email Already Exists pls login" });
    }
    console.log(name);

    const user = await User.create({
      name,
      email,
      password,
    });
    // user.save();
    console.log(user);

    if (!user) {
      res.status(400).json({ msg: "Some Thing went Wrong! plse try again" });
    }

    res.status(201).json({
      success: true,
      message: "User created Successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "some thing went wrong for register",
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const UserExists = await User.findOne({ email }).select("+password");
    const commperpassword = await bcrypt.compare(password, UserExists.password);

    if (!UserExists) {
      return res.status(400).json({
        msg: "This email  dosenot Exists pls create account",
      });
    }

    if (!commperpassword) {
      return res.status(400).json({
        msg: "This  Password dosenot Exists pls create account",
      });
    }

    const token = JWT.sign(
      {
        id: UserExists._id,
        email: UserExists.email,
      },
      process.env.JWT_SECRET_KEY
    );

    console.log("login jwttoken", token);
    res.cookie("token", token, cookieOptions);
    // res.redirect('/todo');
    res.status(200).json({
      success: true,
      message: "login suceesfull",
      data: UserExists,
      token,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
      message: "some thing went wrong for login",
      // console.log()
    });
  }
};
const profile = async (req, res) => {};

export { home, register, login, profile };
