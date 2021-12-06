const PurchaseProduct = (sequelize, DataTypes) => {
  const PurchaseProduct = sequelize.define("PurchaseProduct", {
    quantity: DataTypes.INTEGER,
  });

  PurchaseProduct.associate = (models) => {
    PurchaseProduct.belongsTo(models.Product,
      { foreignKey: 'productId', as: 'product' });
      PurchaseProduct.belongsTo(models.Purchase,
      { foreignKey: 'purchaseId', as: 'purchase' });
  };

  return PurchaseProduct;
}

module.exports = PurchaseProduct;