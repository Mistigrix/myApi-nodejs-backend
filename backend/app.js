const express = require('express');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const { dbConfig } = require('./config/dbConfig');
const app = express();

app.use(express.json());

// CORS Error middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Acces-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use(myConnection(mysql, dbConfig, 'pool'));

// this is a test route
app.get('/api/test', (req, res) => {
    req.getConnection((error, connection) => {
        if (error) {
            console.log(error);
        } else {
            connection.query('SELECT * FROM products', [], (error, query) => {
                if (error) {
                    console.log(error);
                } else {
                    res.status(200).json(query);
                }
            })
        }
    })
})

app.use('/api/products', productsRouter);

app.use('/api/auth', usersRouter);

PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("Server started at port: ", PORT));
