const Sequelize = require("sequelize");

// criar a conexão:
const connection = new Sequelize('nomeDataBase', 'usuario', 'senha', {
    host: 'host',
    dialect: 'mysql'
});

module.exports = connection;
