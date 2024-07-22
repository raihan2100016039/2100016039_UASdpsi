module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define('Restaurant', {
        restaurantId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        owner: DataTypes.STRING,
        address: DataTypes.STRING,
        mapAddress: DataTypes.STRING,
        status: DataTypes.STRING
    });

    Restaurant.associate = (models) => {
        Restaurant.hasMany(models.Rating, { as: 'ratings', foreignKey: 'restaurantId' });
    };

    return Restaurant;
};
