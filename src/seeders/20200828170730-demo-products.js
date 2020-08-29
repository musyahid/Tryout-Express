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
      "Products",
      [
        {
          name: "Product1",
          stock:11,
          price:1111,
          UserId:1,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          name: "Product2",
          stock:12,
          price:1112,
          UserId:2,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          name: "Product3",
          stock:13,
          price:1113,
          UserId:2,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
          name: "Product4",
          stock:14,
          price:1114,
          UserId:4,
          createdAt:new Date(),
          updatedAt:new Date()
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
    await queryInterface.bulkDelete('Products', null, {});
  },
};
