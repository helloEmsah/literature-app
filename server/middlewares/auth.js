const jwt = require("jsonwebtoken");
const { users } = require("../models");
const secretKey = process.env.SECRET_KEY;

exports.authentication = (req, res, next) => {
  let header, token;

  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  ) {
    return res.status(400).send({
      error: {
        message: "Access Denied. Please Login.",
      },
    });
  }

  try {
    const verified = jwt.verify(token, secretKey);

    req.user = verified;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: {
        message: "Invalid Token",
      },
    });
  }
};

exports.authAdmin = async (req, res, next) => {
  try {
    const user = await users.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (user.role !== "admin")
      return res.status(400).send({ message: "You're unauthorized!" });

    next();
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: "Invalid token" });
  }
};
