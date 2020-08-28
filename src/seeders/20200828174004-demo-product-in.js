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
      "Product_ins",
      [
        {
          date: new Date(),
          total: 2,
          ProductId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: new Date(),
          total: 20,
          ProductId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: new Date(),
          total: 30,
          ProductId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: new Date(),
          total: 40,
          ProductId: 3,
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
    await queryInterface.bulkDelete('Product_ins', null, {});
  },
};
