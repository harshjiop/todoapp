import jwt from "jsonwebtoken";
const Auth = async (req, res, next) => {
  try {
    console.log("start");
    // const token = await req.headers;
    // const token = await req.headers.authorization.split(" ")[1];
    // const token = req.cookies.jwt;
    const token = req.cookies.TOKEN;
    console.log("Auth", token);
    if (!token) return res.status(400).json({ msg: "token note found" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(400).json({ msg: "Authorization is not valid." });
      } else {
        req.body.user = user;
        next();
      }
    });
    // req.user = { id: payload.id, email: payload.email };
    // console.log(res.user);
  } catch (err) {
    return res.status(400).json({ msg: err.msg });
  }
};
export default Auth;
