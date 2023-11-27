const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const tbForm = require('./models/Post');
const moment = require('moment');

// Config
    // Template Engine
        app.engine('handlebars', handlebars.engine({
            defaultLayout: 'main',
            runtimeOptions:{
                allowProtoPropertiesByDefault:true,
                allowProtoMethodsByDefault:true
            },
            helpers:{
                formatDate:(datetime)=>{return moment(datetime).format('DD/MM/YYYY, HH:MM')}
            }
        }));
        app.set('view engine', 'handlebars');
    // bodyParser
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());

// rotas
    //arquivos públicos
    app.use(express.static('static'));

    app.get("/", function(req, res){
        tbForm.findAll({
            order:[['id','DESC']]
        }).then(function(posts){
            res.render('home', {posts: posts});
        });
    });

    app.get('/cad', function(req, res){
        res.render('formulario');
    });

    app.post('/cad/add',function(req, res){
        tbForm.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            image: req.body.image
        }).then((result) => {
            res.redirect('/');
        }).catch((err) => {
            res.send('Houve um erro: <br><br>'+err);
        });
    });


// iniciando servidor
app.listen(8081, function(){
    console.log("Servidor rodando.");
    console.log("porta http://localhost:8081");
    console.log("porta http://192.168.15.7:8081");
});

