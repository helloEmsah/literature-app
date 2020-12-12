const { literatures, users, sequelize } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const joi = require("@hapi/joi");

const schema = joi.object({
  title: joi.string().min(3).required(),
  publication: joi.string().required(),
  page: joi.number().required(),
  isbn: joi.number().required(),
  author: joi.string().min(3).required(),
});

exports.getLiteratures = async (req, res) => {
  try {
    const literature = await literatures.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: users,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "phone",
              "address",
              "gender",
              "picture",
              "role",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
    });

    return res.status(200).send({
      message: "All existing literature has been loaded",
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

exports.getLiterature = async (req, res) => {
  try {
    const { id } = req.params;
    const literature = await literatures.findOne({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: users,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "phone",
              "address",
              "gender",
              "picture",
              "role",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
      where: {
        id,
      },
    });
    if (literature) {
      return res.status(200).send({
        message: `Literature with id ${id} has been loaded successfully!`,
        data: { literature },
      });
    } else {
      return res.status(404).send({
        message: "Literature didn't exist",
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

exports.getYear = async (req, res) => {
  try {
    const { title } = req.params;
    const Op = sequelize.Op;
    const approvedLiterature = await literatures.findAll({
      order: [["publication", "DESC"]],
      where: {
        status: "Approved",
      },
      group: ["publication"],
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: users,
          as: "user",
          attributes: {
            exclude: [
              "password",
              "phone",
              "address",
              "gender",
              "picture",
              "role",
              "updatedAt",
              "createdAt",
            ],
          },
        },
      ],
    });
    return res.status(200).send({
      message: "Success",
      data: approvedLiterature,
    });
  } catch (error) {
    return res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

exports.searchLiterature = async (req, res) => {
  let title = req.query.title;
  let public_year = req.query.public_year;

  try {
    if (public_year) {
      const literature = await literatures.findAll({
        include: [
          {
            model: users,
            as: "user",
            attributes: {
              exclude: [
                "password",
                "gender",
                "phone",
                "address",
                "picture",
                "role",
                "createdAt",
                "updatedAt",
              ],
            },
          },
        ],
        attributes: {
          exclude: ["userId", "status", "createdAt", "updatedAt"],
        },
        where: {
          title: {
            [Op.like]: "%" + title + "%",
          },
          publication: {
            [Op.like]: "%" + public_year + "%",
          },
        },
      });

      return res.status(200).send({
        message: `Search literature with corresponding title: ${title}, year: ${public_year}, is success`,
        data: { literature },
      });
    } else {
      const literature = await literatures.findAll({
        include: [
          {
            model: users,
            as: "user",
            attributes: {
              exclude: [
                "password",
                "gender",
                "picture",
                "isAdmin",
                "createdAt",
                "updatedAt",
              ],
            },
          },
        ],
        attributes: {
          exclude: ["userId", "thumbnail", "status", "createdAt", "updatedAt"],
        },
        where: {
          title: {
            [Op.like]: "%" + title + "%",
          },
        },
      });
      return res.status(200).send({
        message: `Literature with ${title} has been loaded successfully`,
        data: { literature },
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

exports.getLiteratureByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const Op = Sequelize.Op;
    const literature = await literatures.findAll({
      where: {
        status: "Approved",
        title: {
          [Op.like]: "%" + title + "%",
        },
      },
      attributes: {
        exclude: ["userId", "thumbnail", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: users,
          as: "user",
          attributes: {
            exclude: [
              "password",
              "phone",
              "address",
              "gender",
              "picture",
              "role",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      ],
    });

    res.send({
      message: `Search literature with key: ${title} success!`,
      data: { literature },
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

exports.getLiteratureByTitleAndYear = async (req, res) => {
  try {
    let { title, publication } = req.params;

    const Op = Sequelize.Op;
    const literature = await literatures.findAll({
      order: [["publication", "DESC"]],
      where: {
        status: "Approved",
        title: {
          [Op.like]: "%" + title + "%",
        },
        publication: {
          [Op.like]: "%" + publication + "%",
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: users,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.send({
      message: "Response Successfuly Loaded",
      data: { literature },
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

exports.addLiterature = async (req, res) => {
  try {
    const { title, author, publication, userId, page, isbn } = req.body;

    const checkIsbn = await literatures.findOne({
      include: [
        {
          model: users,
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
        isbn: req.body.isbn,
      },
    });

    if (checkIsbn) {
      return res.status(500).send({
        error: {
          message: "ISBN already exists!",
        },
      });
    }

    const literature = await literatures.create({
      ...req.body,
      userId: req.user.id,
      file: req.file.filename,
    });

    if (literature) {
      const literatureResult = await literatures.findOne({
        where: {
          id: literature.id,
        },
        include: [
          {
            model: users,
            as: "user",
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "password",
                "phone",
                "address",
                "gender",
                "picture",
                "role",
              ],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      return res.status(200).send({
        message: "Literature has been added successfully",
        data: { literatureResult },
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

// exports.addLiterature = async (req, res) => {
//   try {
//     const { title, author, publication, userId, page, isbn } = req.body;

//     const literature = await literatures.create({
//       ...req.body,
//       userId,
//       // status: "Waiting",
//       thumbnail: "dummy.png"

//     });

//     if (literature) {
//       const literatureResult = await literatures.findOne({
//         where: {
//           id: literature.id,
//         },
//         include: [
//           {
//             model: users,
//             as: "user",
//             attributes: {
//               exclude: [
//                 "createdAt",
//                 "updatedAt",
//                 "password",
//                 "phone",
//                 "address",
//                 "gender",
//                 "picture",
//                 "role",
//               ],
//             },
//           },
//         ],
//         attributes: {
//           exclude: ["createdAt", "updatedAt"],
//         },
//       });
//       return res.status(200).send({
//         message: "Literature has been added successfully",
//         data: { literatureResult },
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       error: {
//         message: "Internal Server Error",
//       },
//     });
//   }
// };

exports.updateLiterature = async (req, res) => {
  try {
    const literature = await literatures.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (literature) {
      const updatedLiterature = await literatures.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: users,
            as: "user",
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "gender",
                "picture",
                "role",
                "password",
              ],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      return res.status(200).send({
        message: `Literature has been successfully updated!`,
        data: { updatedLiterature },
      });
    } else {
      return res.status(404).send({
        message: "Literature didn't exists",
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

exports.deleteLiterature = async (req, res) => {
  try {
    const literature = await literature.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (literature) {
      const deleteliterature = await literature.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).send({
        data: {
          message: "Literature with corresponding id has been deleted",
          id: req.params.id,
        },
      });
    } else {
      return res.status(404).send({
        message: "Literature didn't exists",
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
