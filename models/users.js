module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('users', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        link: {
            type: Sequelize.STRING
        },

        ip: {
            type: Sequelize.STRING
        },

         status: {
             type: Sequelize.ENUM('active', 'inactive'),
             defaultValue: 'active'
         }


    }, {
        underscored: true,

        freezeTableName: true
    });

    return TableName;

}