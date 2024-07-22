const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect,
    dialectModule: require('mysql2')
});

// Import models
const User = require('./User')(sequelize, DataTypes);
const Restaurant = require('./Restaurant')(sequelize, DataTypes);
const Rating = require('./Rating')(sequelize, DataTypes);

// Define associations
const defineAssociations = () => {
    Restaurant.hasMany(Rating, { as: 'ratings', foreignKey: 'restaurantId' });
    Rating.belongsTo(Restaurant, { as: 'restaurant', foreignKey: 'restaurantId' });
};

// Function to sync the database
const syncDatabase = async () => {
    try {
        // Disable foreign key checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        // Sync models with force option (this will drop and recreate tables)
        await sequelize.sync({ alter: true });

        // Enable foreign key checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        console.log('Database synchronized');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
};

// Connect to the database and sync
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');
        
        defineAssociations();
        
        await syncDatabase();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = { sequelize, User, Restaurant, Rating };
