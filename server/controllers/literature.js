const { Literature, User } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const joi = require("@hapi/joi");

exports.getLiteratures = async (req, res) => {
  try {
    // const { page: pageQuery, limit: limitQuery } = req.query;
    // const page = pageQuery ? parseInt(pageQuery) - 1 : 0;
    // const pageSize = limitQuery ? parseInt(limitQuery) : 10;
    // const paginate = ({ page, pageSize }) => {
    //   const offset = page * pageSize;
    //   const limit = pageSize;

    //   return {
    //     offset,
    //     limit,
    //   };
    // };

    const literature = await Literature.findAll({
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
        exclude: ["createdAt", "updatedAt", "userId", "UserId"],
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

exports.searchLiterature = async (req, res) => {
  let title = req.query.title;
  let public_year = req.query.public_year;

  try {
    if (public_year) {
      const literature = await Literature.findAll({
        include: [
          {
            model: User,
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
            model: User,
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

exports.getLiterature = async (req, res) => {
  try {
    const literature = await Literature.findOne({
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
        exclude: ["createdAt", "updatedAt", "userId", "UserId"],
      },
      where: {
        id: req.params.id,
      },
    });
    if (literature) {
      return res.status(200).send({
        message: "Literature has been loaded",
        data: { literature },
      });
    } else {
      return res.status(404).send({
        message: "Literature didn't exist",
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

exports.addLiterature = async (req, res) => {
  const [isAdmin] = req.user;
  const { id } = req.user;

  try {
    const {
      title,
      publication,
      userId,
      page,
      isbn,
      author,
      status,
      file,
      thumbnail,
    } = req.body;

    // const file = req.files["file"][0].filename;

    // const schema = joi.object({
    //   title: joi.string().min(3).required(),
    //   author: joi.string().min(3).required(),
    //   publication: joi.string().min(3).required(),
    //   categoryId: joi.required(),
    //   page: joi.number(),
    //   isbn: joi.number(),
    //   about: joi.string().required(),
    // });
    // const { error } = schema.validate(req.body);
    // if (error) {
    //   return res.status(400).send({
    //     error: {
    //       message: error.details[0].message,
    //     },
    //   });
    // }

    const literature = await literature.create({
      ...req.body,
      userId,
    });

    if (literature) {
      const literatureResult = await literature.findOne({
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
          exclude: ["createdAt", "updatedAt", "userId", "UserId"],
        },
      });
      return res.status(200).send({
        message: "literature has been successfully added",
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
