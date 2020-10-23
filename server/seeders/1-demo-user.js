"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        fullName: "Admin",
        email: "admin@root.com",
        password:
          "$2b$10$UK1BnRkDTYbomsipbmGzLe7FaG3EqdJXgaOS3YibZn4Jrear6HUzS",
        phone: "08123456789",
        address: "Jl Pegangsaan Timur no 56 Jakarta",
        gender: "Male",
        picture:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn0.iconfinder.com%2Fdata%2Ficons%2Fflat-round-system%2F512%2Farchlinux-512.png&f=1&nofb=1",
        isAdmin: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "User",
        email: "user@root.com",
        password:
          "$2b$10$l8ThXlcy63WQnCy1YI2LMOVyfOKdai.IvCd/pHkj7B/bEdnZaPczi",
        phone: "08223456789",
        address: "Jl Dipatiukur no 112 - 116 Bandung",
        gender: "Female",
        picture:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F3%2F3e%2FManjaro-logo.svg%2F1024px-Manjaro-logo.svg.png&f=1&nofb=1",
        isAdmin: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
