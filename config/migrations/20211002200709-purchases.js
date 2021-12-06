'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('Purchases', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: 'int'
    },
    productId: {
      type: 'int',
      references: {
        model: 'Products',
        key: 'id'
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    providerId: {
      type: 'int',
      references: {
        model: 'Providers',
        key: 'id'
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    createdAt: {
      allowNull: false,
      type: 'date'
    },
    updatedAt: {
      allowNull: false,
      type: 'date'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('Purchases');
};

exports._meta = {
  "version": 1
};
