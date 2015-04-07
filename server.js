var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');

var people = [
    {name : "Larry"},
    {name : "Curly"},
    {name : "Moe"},
];

var personSchema = new mongoose.Schema({
    name:String
});

var Person = mongoose.model("Person", personSchema);

mongoose.connect("mongodb://localhost/my_world");
mongoose.connection.once("open", function(){
    Person.find({}, function(err, results){
        if(results.length == 0){
            Person.create(people, function(err, stooges){
                console.log("creating people");
                console.log(stooges);
            });
        }
    });
    console.log("connected");
});

var app = express();

app.use(express.static(__dirname + "/client"));

app.get("/api/people", function(req, res){
    Person.find({}).sort("name").exec(function(err, people){
        res.send(people);
    });
});

app.get("/api/people/:id", function(req, res){
    Person.findById(req.params.id).sort("name").exec(function(err, person){
        res.send(person);
    });
});

app.get("/", function(req, res){
    fs.readFile(__dirname + "/index.html", "utf8", function(err, html){
        res.send(html); //.toString());
    });
});

app.listen(process.env.PORT);