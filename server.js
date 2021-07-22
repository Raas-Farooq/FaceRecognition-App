const express= require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const profile = require('./controller/profile.js');
const signin = require('./controller/signin.js');
const register = require('./controller/register.js');
const image = require('./controller/image.js');



const db = knex({
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : 'raas002211',
      database : 'smartbrain'
    }
  });


const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Will you determined!');
})

app.post('/signin', (req, res) => { signin.handleSignin (req,res,db,bcrypt) })

app.post('/register', (req,res) => { register.handleRegister( req, res, db, bcrypt) })

app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req,res,db) })

app.put('/image', (req, res) => { image.handleImage (req, res, db) })
  
app.post('/imageUrl', (req, res) => { image.handleApiCall (req, res)});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on Port ${process.env.PORT}`);
})


