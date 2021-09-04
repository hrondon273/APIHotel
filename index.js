const express = require('express')
const FS = require('fs');
const app = express()
const dbData = JSON.parse(FS.readFileSync('db.json', 'UTF-8'));
const jwt =require('jsonwebtoken')
require('dotenv').config()

app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.get('/APIHotelManagment', validateToken, (req, res) => {
    res.json({        
        username: req.user,
        dbData
    })
});

app.get('/login', (req, res) => {
    res.send(`<html>
    <head></head>
    <body>
        <form method="POST" action="/auth">
            Usuario: <input type="text" id="username" name="username"><br>
            Contraseña: <input type="password" id="password" name="password"><br>
            <input type="submit" value="Log in">
        </form>
    </body>
    </html>`)
});

app.post('/auth', (req, res) => {
    const {username, password} = req.body

    const user = {username: username}

    const accessToken = generateAccessToken(user)
    res.header('authorization', accessToken).json({
        message: 'Usuario autenticado',
        token: accessToken
    });
})

function generateAccessToken(user){
    return jwt.sign(user, process.env.SECRET, {expiresIn: '5m'})
}

function validateToken(req, res, next){
    const accessToken = req.headers['authorization'] || req.query.token
    if (!accessToken) res.send('Acceso denegado')
    jwt.verify(accessToken, process.env.SECRET, (err, user) => {
        if(err){   
            res.send('Acceso denegado, el token expiró')
        }else{
            req.user = user;
            next()
        }
    });
}
let puerto = process.env.PORT || 3000;
app.listen(puerto, () => {
    console.log('servidor iniciado...')
});