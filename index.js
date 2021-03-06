var express         = require('express');
let bodyParser      = require('body-parser');
var thumbnailsApi   = require('youtube-api-thumbnails');

let app = express();

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

thumbnailsApi.config({
    key: "AIzaSyCbEqLvhESyNOCV8aDG0u_P0pKbXV80Efw",	// required 
    returnAsArray: false,			// optional, default is false 
    onlyHighestRes: false,			// optional, default is false 
    getResolutions: true			// optional, default is false 
})

app.get('/', function (req, res) {
    console.log("hello world");
    res.send('hello world');
}

app.get('/hello', function (req, res) {
    console.log("hello world");
    res.send('hello world');
}

app.get('/thumbnails', function (req, res) {
    console.log('url specified: ', req.query.url);
    var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    
    var Id = req.query.url.match(rx)[1];

    console.log('youtube Id: ', Id);    
    thumbnailsApi.get(Id, function (err, thumbnails) {
        if(err){
            console.log(err);
            return;
        }

        console.log(thumbnails[Id]);
        res.header("Access-Control-Allow-Origin", "*");
        res.send(thumbnails[Id]);  
    });
});

var port = process.env.PORT | 9200;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

console.log(server_host + ':' + port);

app.listen(port, server_host, function(){
    console.log('thumbnail server started at port: ', port);
});
