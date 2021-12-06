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
  return db.createTable('Categories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: 'int'
    },
    name: {
      type: 'string',
      allowNull: false,
      unique: true
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
  return db.dropTable('Categories');
};

exports._meta = {
  "version": 1
};
