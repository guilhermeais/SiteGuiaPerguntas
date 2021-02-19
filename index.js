const express = require("express");
app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Perguntas")
const Resposta = require("./database/Resposta")

//Database 
connection
    .authenticate()
    .then(()=>{
        console.log("Conectado com o banco de dados com sucesso!")
    })
    .catch((msgErro)=>{
        console.log("Falha ao conectar com o banco de dados, Erro: \n" + msgErro)
    })

// Vamos dizer ao Express, que estamos usando o EJS como View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/",(req, res) =>{
    // Equivalente ao select *
        Pergunta.findAll({raw: true, order: [
            ['id', 'desc']
        ]}).then(perguntas =>{
            res.render("index", {
                perguntas: perguntas,
            }) // o render olha automticamente dentro da pasta View
            
        });
    
});

app.get("/perguntar", (req, res)=>{
    res.render("perguntar")
})

app.post("/salvarpergunta", (req, res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var nome = req.body.nome;
    if (nome == undefined || nome == null || nome == "") {
        nome = "Desconhecido"
    }
    //Equivalente ao insert no sql
    Pergunta.create({  
        nome: nome,
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
       
        res.redirect("/");
    });
})

app.get("/pergunta/:id", (req, res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if (pergunta != undefined) {
            
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas,                   
                    }) 
            })

       
        }
        else{
            res.redirect("/")
        }
    })
});

app.post("/responder", (req, res) =>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta; // aqui pegamos pelo body, pois os dados estão no corpo do html
    var nome = req.body.nome;
    if (nome == undefined || nome == null || nome == "") {
        nome = "Desconhecido"
    }
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId,
        nome: nome
    }).then(()=>{
        res.redirect("/pergunta/" + perguntaId);
    })
})

app.listen(8080, ()=>{
    console.log("Servidor iniciado!!")
})
