'use strict';
module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define('orders', {
        itemId: DataTypes.INTEGER,
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {});
    Orders.associate = (models) => {
        // associations can be defined here
        Orders.belongsTo(models.items, {
            foreignKey: 'itemId',
            //if we delete an item, the associated order should also be deleted.
            onDelete: 'CASCADE'
        })
    };
    return Orders;
};
