const { Paper, User } = require("../models");

const joi = require("@hapi/joi");

exports.getAllPaper = async (req, res) => {
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

    const paper = await Paper.findAll({
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
      message: "All existing paper has been loaded",
      data: { paper },
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

exports.getPaper = async (req, res) => {
  try {
    const paper = await Paper.findOne({
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
    if (paper) {
      return res.status(200).send({
        message: "Paper has been loaded",
        data: { paper },
      });
    } else {
      return res.status(404).send({
        message: "Paper didn't exist",
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

exports.addPaper = async (req, res) => {
  try {
    const {
      title,
      userId,
      publication,
      page,
      author,
      isbn,
      file,
      thumbnail,
    } = req.body;

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

    const paper = await Paper.create({
      ...req.body,
      userId,
    });

    if (paper) {
      const paperResult = await Paper.findOne({
        where: {
          id: paper.id,
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
        message: "Paper has been successfully added",
        data: { paperResult },
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

exports.deletePaper = async (req, res) => {
  try {
    const paper = await Paper.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (paper) {
      const deletePaper = await Paper.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).send({
        data: {
          message: "Paper with corresponding id has been deleted",
          id: req.params.id,
        },
      });
    } else {
      return res.status(404).send({
        message: "Paper didn't exists",
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
