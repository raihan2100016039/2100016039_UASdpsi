module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment: DataTypes.STRING,
        foodRating: DataTypes.INTEGER,
        cleanlinessRating: DataTypes.INTEGER,
        serviceRating: DataTypes.INTEGER,
        restaurantId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Restaurants',
                key: 'restaurantId'
            }
        }
    });

    Rating.associate = (models) => {
        Rating.belongsTo(models.Restaurant, { as: 'restaurant', foreignKey: 'restaurantId' });
    };

    return Rating;
};
