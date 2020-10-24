"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Literature", [
      {
        title: "Literature 1",
        userId: 1,
        publication: "December 2015",
        page: 152,
        isbn: 1234567890,
        author: "Author 1",
        file: "unknown.pdf",
        thumbnail: "unknown.jpg",
        status: "Waiting",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Literature 2",
        userId: 2,
        publication: "May 1995",
        page: 254,
        isbn: 1154321575,
        author: "Author 2",
        file: "unknown.pdf",
        thumbnail: "unknown.jpg",
        status: "Waiting",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Literature 3",
        userId: 2,
        publication: "September 2012",
        page: 364,
        isbn: 5784512354,
        author: "Author 3",
        file: "unknown.pdf",
        thumbnail: "unknown.jpg",
        status: "Waiting",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Literature", null, {});
  },
};
