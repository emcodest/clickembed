module.exports = function (sequelize, Sequelize) {

    var TableName = sequelize.define('hijack_panel', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        cookie_key: {
            type: Sequelize.STRING
        },

        affiliate_id: {
            type: Sequelize.STRING
        },

        network: {
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