'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users',
    [
      {
        id: "fa905e14-7eb7-469b-b3e2-cfbdcae3dce3",
        name: "Dr. Demitido",
        email: "teste@gmail.com",
        role: "seller",
        isActive: false,
        hashedPassword: "$2b$08$zv2MvHK5TPolsJozN8nVX.6GXuKVait0pHKFtwoBXgYbDSFReWGOO",
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        id: "b22d9a9c-6f72-4188-9408-5a17fbc08912",
        name: "Sr. Admin",
        email: "email@gmail.com",
        role: "admin",
        isActive: true,
        hashedPassword: "$2b$08$/ebGmBWZXX/aDKB3ZQ5Iiewqqq7SkiFnPL3vAksQMaM.DFZluSWnC",
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
