const { users, literatures } = require("../models");

exports.getUsers = async (req, res) => {
  try {
    const user = await users.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    return res.status(200).send({
      message: "All users has been loaded successfully!",
      data: { user },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await users.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });
    if (user) {
      return res.status(200).send({
        message: `User with id ${id} has been loaded successfully`,
        data: user,
      });
    } else {
      return res.status(404).send({
        message: "User didn't exist",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

exports.getUserLiterature = async (req, res) => {
  const { id } = req.params;
  try {
    const getLiterature = await literatures.findAll({
      include: [
        {
          model: users,
          as: "user",
          attributes: {
            exclude: [
              "password",
              "gender",
              "picture",
              "phone",
              "address",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      ],

      attributes: {
        exclude: ["userId", "thumbnail", "createdAt", "updatedAt"],
      },
      where: {
        userId: id,
      },
    });

    return res.status(200).send({
      message: `Literature belongs to user id ${id} has been loaded successfully`,
      data: getLiterature,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await users.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (user) {
      const deleteUser = await users.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).send({
        message: "User with corresponding id has been deleted",
        data: {
          id: req.params.id,
        },
      });
    } else {
      return res.status(404).send({
        message: "User didn't exist",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const [userUpdated] = await users.update(
      {
        ...req.body,
        picture: req.file.filename,
      },
      {
        where: {
          id,
        },
      }
    );

    if (!userUpdated) {
      return res.status(404).send({
        message: "User didn't exist",
      });
    }

    const data = await users.findOne({
      where: {
        id,
      },

      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    res.send({
      message: "User has been updated",
      data: {
        data,
        path: req.file.path,
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
