const uuid = require("uuid/v1");
("use strict");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "rol",
      [{
          id: uuid(),
          rol: "proyectista",
          name: "Proyectista",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          rol: "jArea",
          name: "Jefe de Area",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          rol: "recursosH",
          name: "Recursos Humanos",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          rol: "calidad",
          name: "Calidad",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          rol: "contabilidad",
          name: "Contabilidad",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          rol: "economia",
          name: "Economia",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          rol: "admin",
          name: "Administrador",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          rol: "director",
          name: "Director",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("rol", null, {});
  }
};