const PurchasesModel = (sequelize, DataTypes) => {
  const Purchase = sequelize.define("Purchase", {
   
  });

  Purchase.associate = (models) => {
    Purchase.belongsTo(models.Provider,
      { foreignKey: 'providerId', as: 'provider' });
  };

  return Purchase;
};

module.exports = PurchasesModel;
