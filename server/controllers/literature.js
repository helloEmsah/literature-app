const { literatures, users } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const joi = require("@hapi/joi");

exports.getLiteratures = async (req, res) => {
  try {
    const literature = await literatures.findAll({
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
      data: {literature},
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
    const {id} = req.params
    const literature = await literatures.findOne({
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
        data: {literature} ,
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

exports.searchLiterature = async (req, res) => {
  let title = req.query.title;
  let public_year = req.query.public_year;

  try {
    if (public_year) {
      const literature = await Literature.findAll({
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
      const literature = await Literature.findAll({
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
            exclude: ["password", "phone", "address", "gender", "picture", "role" ,"createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.send({
      message: `Search literature with key: ${title} success!`,
      data: {literature},
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

exports.readYear = async (req, res) => {
  try {
    const { title } = req.params;
    const Op = Sequelize.Op;
    const aprovedBooks = await Books.findAll({
      order: [["publication", "DESC"]],
      where: {
        status: "Approved",
      },
      group: ["publication"],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          ,
          "userId",
          "categoryId",
          "UserId",
          "CategoryId",
        ],
      },
      include: [
        {
          model: users,
          as: "bookUser",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.send({
      message: "Response Successfuly Loaded",
      data: { all: aprovedBooks },
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

exports.getLiteratureByTitleAndYear = async (req, res) => {
  try {
    let { title, pub } = req.params;

    const Op = Sequelize.Op;
    const literature = await literatures.findAll({
      order: [["publication", "DESC"]],
      where: {
        status: "Approved",
        title: {
          [Op.like]: "%" + title + "%",
        },
        publication: {
          [Op.gt]: pub + "/01/01",
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
      data:  {literature} ,
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

    const literature = await Literature.create({
      ...req.body,
      userId,
      file: req.file.filename,
    });

    if (literature) {
      const literatureResult = await Literature.findOne({
        where: {
          id: literature.id,
        },
        include: [
          {
            model: User,
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
                "isAdmin",
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

// exports.updateBook = async (req, res) => {
//   try {
//     const book = await Book.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (book) {
//       const updatedBook = await Book.findOne({
//         where: {
//           id: req.params.id,
//         },
//         include: [
//           {
//             model: Category,
//             as: "category",
//             attributes: {
//               exclude: ["createdAt", "updatedAt"],
//             },
//           },
//           {
//             model: User,
//             as: "user",
//             attributes: {
//               exclude: [
//                 "createdAt",
//                 "updatedAt",
//                 "gender",
//                 "picture",
//                 "role",
//                 "password",
//               ],
//             },
//           },
//         ],
//         attributes: {
//           exclude: [
//             "createdAt",
//             "updatedAt",
//             "userId",
//             "UserId",
//             "categoryId",
//             "CategoryId",
//           ],
//         },
//       });
//       return res.status(200).send({
//         message: "Book has been updated",
//         data: { updatedBook },
//       });
//     } else {
//       return res.status(404).send({
//         message: "Book didn't exists",
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
