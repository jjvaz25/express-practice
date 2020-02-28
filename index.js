const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');


//init middleware
// app.use(logger);

//handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Homepage route
app.get('/', (req, res) => res.render('index', {
  title: 'Member App',
  members: members
}));

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//members api routes
app.use('/api/members', require('./routes/api/members'))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server started on ' + PORT));