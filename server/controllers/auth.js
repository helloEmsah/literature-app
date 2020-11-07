const { user } = require("../models/");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const joi = require("@hapi/joi");

const secretKey = process.env.SECRET_KEY;
//const secretKey = "mySecretKey";

exports.checkAuth = async (req, res) => {
  try {
    const data = await user.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.send({
      message: "User Valid",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

exports.Register = async (req, res) => {
  try {
    const { fullName, email, password, gender, phone, address } = req.body;

    const schema = joi.object({
      fullName: joi.string().min(3).required(),
      email: joi.string().email().min(5).required(),
      password: joi.string().min(8).required(),
      gender: joi.string().min(4).required(),
      phone: joi.number().min(6).required(),
      address: joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    const checkEmail = await user.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.status(400).send({
        error: {
          message: "Email already exist",
        },
      });
    }

    const salt = 10;
    const hashed = await bcrypt.hash(password, salt);

    const newUser = await user.create({
      ...req.body,
      password: hashed,
      picture: "default-avatar.png",
      role: "user",
    });

    const token = jwt.sign(
      {
        id: newUser.id,
      },
      secretKey
    );

    res.send({
      message: "Registration success!",
      data: {
        email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = joi.object({
      email: joi.string().email().min(5).required(),
      password: joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    const userLogin = await user.findOne({
      where: {
        email,
      },
    });

    if (!userLogin) {
      return res.status(400).send({
        error: {
          message: "Email or Password incorrect",
        },
      });
    }

    const validate = await bcrypt.compare(password, userLogin.password);

    if (!validate) {
      return res.status(400).send({
        error: {
          message: "Email or Password incorrect",
        },
      });
    }

    const token = jwt.sign(
      {
        id: userLogin.id,
      },
      secretKey
    );

    res.send({
      message: "Login success",
      data: {
        email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};
