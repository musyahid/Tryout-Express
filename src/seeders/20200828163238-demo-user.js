"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          full_name: "Musyahid Abror",
          username: "musyahid",
          email: "musyahid@gmail.com",
          phone_number: 62562007441,
          salt: "as23sada21",
          password: "123abc",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          full_name: "Dimar Hanung",
          username: "dimar",
          email: "dimarhanung@gmail.com",
          phone_number: 627793110422,
          salt: "as23sada21",
          password: "123abc",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          full_name: "Dicky Fahlevi",
          username: "dicky123",
          email: "dicky@gmail.com",
          phone_number: 62562007441,
          salt: "as23sada21",
          password: "123abc",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          full_name: "Musfirotus",
          username: "musfirotus",
          email: "musfirotus@gmail.com",
          phone_number: 62884124124,
          salt: "as23sada21",
          password: "123abc",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          full_name: "Agung Dwi",
          username: "agungdwi",
          email: "agungdwi@gmail.com",
          phone_number: 625620033323,
          salt: "as23sada21",
          password: "123abc",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  },
};
