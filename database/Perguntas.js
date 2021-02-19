const Sequelize = require("sequelize");
const connection = require("./database");

// model:
const Pergunta = connection.define('perguntas',{
    nome:{
        type: Sequelize.STRING
    },
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
  
});

// sincronica com o banco de dados e cria a tabela no bs caso ela n exista
Pergunta.sync({force: false}).then(()=>{
    console.log("Tabela criada!")
})

module.exports = Pergunta;