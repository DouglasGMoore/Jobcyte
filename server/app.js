// Load server using express
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const nodemailer = require('nodemailer');

app.use(cors());

const mysql = require('mysql');

// Body parser
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ 'extended': false }));
app.use(bodyParser.json());

// Display static pages in public folder with
// app.use(express.static('./public'))

// Error and use messages
app.use(morgan('short'));

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


// Insert user info from form to uTube database
app.post('/register', (req, res) => {
    console.log('First name: ' + req.body.firstName);


    const firstName = req.body.firstName;
    const password = req.body.password;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const username = req.body.usrName;
    const queryString = 'INSERT INTO members (firstName, lastName, password, email, username) VALUES (?, ?, ?, ?, ?)';
  

    getConnection().query(queryString, [ firstName, lastName, password, email, username ], (err, results, fields) => {
        if(err){
            console.log('Failed to insert new user: ' + err);
            res.sendStatus(500);
            
            return;
        }
   
        console.log('Inserted a new user with id: ', results.insertId);
        res.end();
    });
});

// Insert user info from form to meetings database
app.post('/office', (req, res) => {
    console.log('name: ' + req.body.name);


    const name = req.body.title;
    const topic = req.body.topic;
    const date = req.body.date;
    const time = req.body.time;
    const notes = req.body.notes;
    const location = req.body.location;
    const queryString = 'INSERT INTO meetings (name, topic, date, time, notes, location) VALUES (?, ?, ?, ?, ?, ?)';
  

    getConnection().query(queryString, [ name, topic, date, time, notes, location ], (err, results, fields) => {
        if(err){
            console.log(name);
            console.log('Failed to insert meeting: ' + err);
            res.sendStatus(500);
            
            return;
        }
   
        console.log('Inserted a meeting with id: ', results.insertId);
        res.end();
    });
});

// Authenticate user
app.post('/login', (req, res) => {
    // console.log("First name: " + req.body.create_first_name)

    const password = req.body.password;
    const username = req.body.usrName;

    const queryString = `SELECT * FROM jobcyte.members WHERE username  = '${username}'`;

    // eslint-disable-next-line complexity
    getConnection().query(queryString, [ username ], (err, results, fields) => {
        if(err){
            console.log('Failed to get user password: ' + err);
            res.sendStatus(500);
            
            return;
        }
        const users = results.map((row) => ({ 'username': row.username, 'password': row.password , 'email': row.email }));

        if(users.length === 1){
            if(users[0].password === password){
                res.json(users);
            }
            else{
                res.json({ 'error': 'password incorrect' });
            }
        }
        else{
            res.json({ 'error': 'no user found' });
        }
    });
});

// connection info set as a function
function getConnection(){
    return mysql.createConnection({
        'host': 'localhost',
        'user': 'root',
        'password': 'password',
        'database': 'jobcyte'
    });
}

// create route for user page
app.get('/meeting/:title', (req, res) => {
    console.log('Fetching user with id: ' + req.params.id);

    const connection = getConnection();

    const usemeetingrId = req.params.id;
    const queryString = 'SELECT * FROM meetings WHERE name = ?';

    connection.query(queryString, [ userId ], (err, rows, fields) => {
        if(err){
            console.log('Failed to query for users: ' + err);
            res.sendStatus(500);
            
            return;
        }
        console.log('Fetch users successfully');

        // displays row of user requested
        const users = rows.map((row) => ({ 'firstName': row.first_name, 'lastName': row.last_name }));

        res.json(rows);
    });
});

// create route for users list
app.get('/members', (req, res) => {
    const connection = getConnection();
    const queryString = 'SELECT * FROM members';

    connection.query(queryString, (err, rows, fields) => {
        if(err){
            console.log('Failed to query for users: ' + err);
            res.sendStatus(500);
            
            return;
        }

    
        res.json(rows);
    });
});

app.get('/meetings', (req, res) => {
    const connection = getConnection();
    const queryString = 'SELECT * FROM meetings WHERE date >= NOW();';

    connection.query(queryString, (err, rows, fields) => {
        if(err){
            console.log('Failed to query for users: ' + err);
            res.sendStatus(500);
            
            return;
        }

    
        res.json(rows);
    });
});



app.get('/meetingsPast', (req, res) => {
    const connection = getConnection();
    const queryString = 'SELECT * FROM meetings WHERE date < NOW();';

    connection.query(queryString, (err, rows, fields) => {
        if(err){
            console.log('Failed to query for users: ' + err);
            res.sendStatus(500);
            
            return;
        }

    
        res.json(rows);
    });
});



app.get('/', (req, res) => {
    console.log('Responding to root route');
    res.send('I am G-ROOOOOT');
});

app.post('/forgot', (req, res) => {
    let username = req.body.username;
    
    const queryString = `SELECT * FROM jobcyte.members WHERE username  = '${username}'`;

    // eslint-disable-next-line complexity
    getConnection().query(queryString, [ username ], (err, results, fields) => {
        if(err){
            console.log('Failed to get user password: ' + err);
            res.sendStatus(500);
            
            return;
        }
        const users = results.map((row) => ({ 'username': row.username, 'email': row.email, 'password': row.password }));
        let password = users[0].password;
        let email = users[0].email;

        if(users.length === 1){
            console.log(password);
            if(users[0].username){
                let transporter = nodemailer.createTransport({
                    'service': 'gmail',
                    'auth': {
                        'user': 'douglasg.moore@gmail.com',
                        'pass': 'budwiser'
                    }
                });
                let mailOptions = {
                    'from': 'douglasg.moore@gmail.com',
                    'to': `${email}`,
                    'subject': 'password recovery',
                    'text': `'${username}, Here is your password: ${password}'`
                };

                // eslint-disable-next-line func-names
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log(error);
                    }
                    else{
                        console.log('Email sent: ' + info.response);
                    }
                });

                res.json(users);
            }
            else{
                res.json({ 'error': 'email does not match' });
            }
        }
        else{
            res.json({ 'error': 'no user found' });
        }
    });
});


// localhost:3004
app.listen(3004, () => {
    console.log('Server is up and listening on 3004...');
});


