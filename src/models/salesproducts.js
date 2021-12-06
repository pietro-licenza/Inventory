module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define("SalesProduct", {
    quantity: DataTypes.INTEGER,
  });

  SalesProduct.associate = (models) => {
    SalesProduct.belongsTo(models.Product,
      { foreignKey: 'productId', as: 'product' });
      SalesProduct.belongsTo(models.Sale,
      { foreignKey: 'saleId', as: 'sale' });
  };

  return SalesProduct;
}