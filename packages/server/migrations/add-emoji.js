'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: function (migration, DataTypes) {
    return migration
      .createTable('Emoji', {
        id: DataTypes.INTEGER,
        emojiCode: DataTypes.STRING,
      })
      .then(function () {
        migration.bulkInsert('Emoji', [
          {
            id: 1, 
            emojiCode: 'grin',
          }, {
            id: 2, 
            emojiCode: 'cry',
          }, {
            id: 3, 
            emojiCode: 'pout',
          }, {
            id: 4, 
            emojiCode: 'smile',
          }
        ]);
      });
  },
  down: function (migration, _, done) {
    return migration.dropTable('Emoji').then(function () {
      done();
    });
  },
};
