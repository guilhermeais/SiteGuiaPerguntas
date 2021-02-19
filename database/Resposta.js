const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define('respostas', {
    nome:{
        type: Sequelize.STRING
    },
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false},
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
 
});

Resposta.sync({force: false}).then((msgError)=>{
    console.log(msgError);
});

module.exports = Resposta;
