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
  return db.createTable('Addresses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: 'int'
    },
    street: {
      type: 'string',
      allowNull: false
    },
    number: {
      type: 'int',
      allowNull: false
    },
    neighborhood: {
      type: 'string',
      allowNull: false
    },
    state: {
      type: 'string',
      allowNull: false
    },
    city: {
      type: 'string',
      allowNull: false
    },
    cep: {
      type: 'string',
      allowNull: false
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
  return db.dropTable('Addresses');
};

exports._meta = {
  "version": 1
};
