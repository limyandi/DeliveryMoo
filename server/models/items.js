'use strict';
module.exports = (sequelize, DataTypes) => {
    const Items = sequelize.define('items', {
        type: DataTypes.STRING,
        color: DataTypes.STRING,
        size: DataTypes.ENUM('S', 'M', 'L'),
        stock: DataTypes.INTEGER
    }, {});
    Items.associate = (models) => {
        // associations can be defined here
        Items.hasMany(models.orders, {
            foreignKey: 'itemId'
        })
    };
    return Items;
};
