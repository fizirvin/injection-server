import dotenv from 'dotenv';

dotenv.config();

module.exports = {
    api: {
        port: process.env.PORT || 3001
    },
    database: {
        url: process.env.DATABASE_URL
    }
}