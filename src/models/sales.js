const SaleModel = (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale", {
    paymentMethod: DataTypes.STRING,
    isSaleComplete: DataTypes.BOOLEAN
  });
 
  Sale.associate = (models) => {
    Sale.belongsTo(models.Client,
      { foreignKey: 'clientId', as: 'client' });
  };

  return Sale;
};

module.exports = SaleModel;
