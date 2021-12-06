const AddressModel = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    neighborhood: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    cep: DataTypes.STRING,
  });

  Address.associate = (models) => {
    Address.hasOne(models.Provider,
      { foreignKey: 'providerAddress', as: 'address' });
  };

  return Address;
};

module.exports = AddressModel;
