"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        fullName: "Admin",
        email: "admin@root.com",
        password:
          "$2b$10$UK1BnRkDTYbomsipbmGzLe7FaG3EqdJXgaOS3YibZn4Jrear6HUzS",
        phone: "08123456789",
        address: "Jl Pegangsaan Timur no 56 Jakarta",
        gender: "Male",
        picture: "default-avatar.png",
        role: "admin",
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
        picture: "default-avatar.png",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
