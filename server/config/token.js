const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    token: process.env.JWT_SECRET
}