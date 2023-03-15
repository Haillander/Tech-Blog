
const express = require('express');
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers}); 



const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
// Port start node js with express listening port
const PORT = process.env.PORT || 3001;

// *** Start of init express session cookies pass ***
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
// *** End of init express session cookies pass ***

app.use(session(sess));

// handlebars init
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express sessions to handle fetch as json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



app.use(routes);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
