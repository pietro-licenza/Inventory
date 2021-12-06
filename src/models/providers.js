module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    name: DataTypes.STRING,
    corporateName: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
  },
  {
    timestamps: true,
    tableName: 'Providers',
    underscored: false,
  });

  Provider.associate = (models) => {
    Provider.belongsTo(models.Address,
      { foreignKey: 'providerAddress', as: 'address' });
    Provider.hasOne(models.Purchase,
      { foreignKey: 'providerId', as: 'provider' });
  };

  return Provider;
};
