const mysql = require('mysql2');

const knex = require('knex').knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: 'admin',
        database: "flight_system"
    }
});

module.exports = {
    knex
}