const { Literature, Collection, User } = require("../models");

exports.myCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await Collection.findAll({
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
          exclude: [
            "id_category",
            "userId",
            "createdAt",
            "updatedAt",
            "publication",
            "pages",
            "ISBN",
            "aboutBook",
            "file",
          ],
        },
      },
      where: {
        userId: id,
      },
      attributes: {
        exclude: ["literatureId", "userId", "createdAt", "updatedAt"],
      },
    });
    res.send({
      message: `Your collection has been successfully loaded`,
      data: {
        collections: collection,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};
