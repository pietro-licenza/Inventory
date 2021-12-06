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
  return db.createTable('Users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: 'string'
    },
    name: {
      type: 'string',
      allowNull: false
    },
    email: {
      type: 'string',
      allowNull: false,
      unique: true,
      isEmail: true
    },
    hashedPassword: {
      type: 'string',
      allowNull: false
    },
    role: {
      type: 'string',
      allowNull: false
    },
    isActive: {
      type: 'boolean',
      allowNull: false,
      defaultValue: true
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
  return db.dropTable('Users');
};

exports._meta = {
  "version": 1
};
