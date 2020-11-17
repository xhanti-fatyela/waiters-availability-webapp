const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const flash = require('express-flash');
const session = require('express-session');

// const Registrations = require("./registrations");
// const routes = require("./regRootKeeper")


let app = express();

const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/registrations';

const pool = new Pool({
    connectionString
});

// const registrations = Registrations(pool);
// const routeKeeper = routes(registrations);

app.use(express.static('public'));

// initialise session middleware - flash-express depends on it
app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  
    res.render('index');
  
  });

  app.get('/', function (req, res) {
  
    res.render('index');
  
  });

  app.post('/waiters/:username', function (req, res) {
  
    res.render('index');
  
  });

let PORT = process.env.PORT || 3555;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});