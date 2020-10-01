import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.authToken": token,
    });

    if (!user) throw new Error();

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Authorization failed." });
  }
};

export default auth;
