var express = require("express")
var hbs = require("hbs")
var bodyParser = require("body-parser")
var appmiddlewere = require("./middlewere/authentication")
var app = express();
var session = require("express-session")
var joi = require("joi")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use( "/login",appmiddlewere)

app.set('views',__dirname+'/views');
app.set('view engine', 'hbs');
// app.set('view options', { layout: 'layout' });

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper("inc", function(value, options) {
    return value+1;
})

app.use(session({
    secret:'my secret',
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:1000000}
}))

var user = {
    email : "pranayrathor1@gmail.com",
    password: 1234
}



app.get("/signup",(req,res)=>{
    
    res.render("signup")
})
app.get("/login",(req,res)=>{
    console.log(JSON.stringify(req.params.email))
    console.log(JSON.stringify(req.params.password))
    console.log(JSON.stringify(req.body.password))
    res.render("login")
    if(req.params.email == user.email){
        res.redirect("/success")
    }
})

app.get("/success",(req,res)=>{
    res.render("success")
})

app.listen(3000, ()=> console.log("server is running..."))