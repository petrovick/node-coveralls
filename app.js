var express    = require('express');
var app        = express();
var path       = require('path');
var http       = require('http');
var port       = process.env.PORT || 3000;
var load       = require('express-load');
var bodyParser = require('body-parser');
//var mongoq = require('mongoq');

// Configurando a execução do banco MongoDB
//var COLLECTION = 'nodepivii';
//var DB = 'nodepivii';
//var db = mongoq(DB);
//var collection = db.collection(COLLECTION);


var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
MongoClient.connect('mongodb://petrovick:123@ds043002.mongolab.com:43002/nodepivii', function (err, db) {
    if (err) {
        throw err;
    } else {
        console.log("successfully connected to the database");
    }
    db.close();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

load('controllers')
	.then('routes')
	.into(app);

app.start = function() {
	server = http.createServer(app);
	server.listen(port, function() {
		console.log('Aplicação iniciada na porta ' + port + '.');
	});
};

app.stop = function() {
	server.close();
	console.log('Aplicação finalizada.');
};

module.exports = app;
