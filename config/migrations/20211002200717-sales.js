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
  return db.createTable('Sales', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: 'int'
    },
    clientId: {
      type: 'int',
      references: {
        model: 'Clients',
        key: 'id'
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    paymentMethod: {
      type: 'string',
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: 'date'
    },
    updatedAt: {
      allowNull: true,
      type: 'date'
    },
    isSaleComplete: {
      allowNull: true,
      type: 'boolean'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('Sales');
};

exports._meta = {
  "version": 1
};
