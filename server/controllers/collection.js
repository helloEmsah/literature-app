const { literatures, collections, users} = require("../models");

// exports.getCollection = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const collection = await collections.findAll({
//       where: {
//         userId: id,
//       },
//       include: {
//         model: users,
//         as: "user",
//         include: {
//           model: literatures,
//           as: "literature",
//           attributes: {
//             exclude: [
//               "createdAt",
//               "updatedAt",
//               "password",
//               "phone",
//               "address",
//               "gender",
//               "picture",
//               "role",
//             ],
//           },
//         },
//         attributes: {
//           exclude: ["userId", "literatureId" ,"createdAt", "updatedAt"],
//         },
//       },

//       attributes: {
//         exclude: ["userId", "literatureId" ,"createdAt", "updatedAt"],
//       },
//     });
//     res.status(200).send({
//       message: "Collection has been loaded successfully",
//       data: {
//         collection,
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({
//       error: {
//         message: "Internal Server Error",
//       },
//     });
//   }
// };

// exports.getCollection = async (req, res) => {
//   try {
//     const { id } = req.user
//     const collection = await collections.findAll({
//       include: {
//         model: literatures,
//         as: "literature",
//         include: {
//           model: users,
//           as: "user",
//           attributes: {
//             exclude: ["password", "phone", "address", "gender", "picture", "role", "createdAt", "updatedAt"],
//           },
//         },
//         attributes: {
//           exclude: [
//            "userId" ,"thumbnail", "createdAt", "updatedAt"
//           ],
//         },
//       },
//       where: {
//         userId: id,
//       },
//       attributes: {
//         exclude: ["literatureId", "userId", "createdAt", "updatedAt"],
//       },
//     });
//     res.send({
//       message: `Your collection has been successfully loaded`,
//       data: collection
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       error: {
//         message: "Internal Server Error",
//       },
//     });
//   }
// };

exports.getCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await collections.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          model: literatures,
          as: 'literature',
          attributes: {
            exclude: ["thumbnail", "userId", "createdAt", "updatedAt"]
          },
          include: [
            {
              model: collections,
              as: 'collection',
              attributes: {
                exclude: ["id", "literatureId", "createdAt", "updatedAt"]
              }
            },
          ],
        },
      ],
     attributes: {
       exclude: ["createdAt", "updatedAt", "userId", "literatureId"]
     }
    });

    res.send({
      message: `User id ${id} collection has been loaded successfully!`,
      data: {collection},
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

exports.addCollection = async (req, res) => {
  try {
    const userId = req.user.id;
    const { literatureId } = req.params;

    await collections.create({
      userId,
      literatureId,
    });

    const { id, title } = await literatures.findOne({
      where: {
        id: literatureId,
      },
    });

    return res.status(200).send({
      message: "Collection has been added successfully!",
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

    await collections.destroy({
      where: {
        userId,
        literatureId,
      },
    });

    const { id, title } = await literatures.findOne({
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
