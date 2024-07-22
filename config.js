require('dotenv').config();

module.exports = {
    secret: process.env.JWT_SECRET || 'default_jwt_secret_key',
    db: {
        database: process.env.DB_NAME || 'defaultdb',
        username: process.env.DB_USER || 'defaultuser',
        password: process.env.DB_PASSWORD || 'defaultpassword',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '3306',
        dialect: process.env.DB_DIALECT || 'mysql'
    }
};
