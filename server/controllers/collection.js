const { Literature, Collection, User } = require("../models");

exports.getCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await Collection.findAll({
      where: {
        userId: id,
      },
      include: {
        model: Literature,
        as: "literature",
        include: {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).send({
      message: "Collection has been loaded successfully",
      data: {
        collection,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

exports.addCollection = async (req, res) => {
  try {
    const userId = req.user.id;
    const { literatureId } = req.params;

    await Collection.create({
      userId,
      literatureId,
    });

    const { id, title } = await Literature.findOne({
      where: {
        id: literatureId,
      },
    });

    return res.status(200).send({
      message: "Collection has been added succressfully",
      data: {
        id,
        title,
      },
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

exports.deleteCollection = async (req, res) => {
  try {
    const { literatureId } = req.params;
    const userId = req.user.id;
    await Collection.destroy({
      where: {
        userId,
        literatureId,
      },
    });

    const { id, title } = await Literature.findOne({
      where: {
        id: literatureId,
      },
    });

    return res.status(200).send({
      message: "Collection has been remove",
      data: {
        id,
        title,
      },
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
