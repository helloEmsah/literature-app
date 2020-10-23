const { User, Literature } = require("../models");

exports.getUsers = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    return res.status(200).send({
      message: "All existing user has been loaded successfully!",
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
    const user = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (user) {
      return res.status(200).send({
        message: "User with corresponding id has been loaded",
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
    const literature = await Literature.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: {
        userId: id,
      },
    });

    return res.status(200).send({
      message: `Literature with user id ${id} has been loaded successfully`,
      data: { literature },
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
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (user) {
      const deleteUser = await user.destroy({
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

exports.uploadPicture = async (req, res) => {
  try {
    const { id } = req.user;
    await User.update(
      { picture: req.file.filename },
      {
        where: {
          id,
        },
      }
    );
    const user = await User.findOne({
      include: {
        model: Literature,
        as: "literatures",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    return res.status(200).send({
      message: `Avatar has been updated`,
      data: { user },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};
