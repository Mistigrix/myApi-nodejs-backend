const { request } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');
const app = express();


const Connection = require('tedious').Connection;
const Request = require('tedious').Request;

const config = {
    server: 'localhost',
    authentification: {
        type: 'default',
        options: {
            userName: 'root',
            password: ''
        }
    }
}

const connection = new Connection(config)

connection.on('connect', (err) => {
    if (err) {
        conslole.log(err);
    } else {
        executeStatement();
    }
})

function executeStatement() {
    request = new Request("select 123", "hello world", (err, rowCount) => {
        if (err) {
            console.log(err);
        } else {
            console.log('${rowCount} rows');
        }
        connection.close();
    });

    request.on('row', (columns) => {
        columns.forEach(column => {
            if (column.value === null) {
                console.log('Null');
            } else {
                console.log(column.value);
            }
        });
    });

    connection.execSql(request);
}










mongoose.connect('mongodb+srv://Mistigrix:myapi@cluster0.lgdxmyz.mongodb.net/?retryWrites=true&w=majority', (error) => {
    if (error) {
        return console.error(error);
    }
    console.log("Connextion réussit");
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/api/products', (req, res, next) => {
    Product.find()
    .then((products) => res.statut(200).json(products))
    .catch((error) => res.status(400).json(error))
});

app.post('/api/products', (req, res, next) => {
    const product = new Product({
        ...req.body
    });
    product.save()
    .then(product => res.status(201).json({ product }))
    .catch(errors => res.status(400).json(errors))

});

app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({id: req.params.id})
    .then((products) => res.status(200).json(products))
    .catch(errors => res.status(400).json(error))
});

app.put('/api/products/:id', (req, res, next) => {
    Product.updateOne({id: req.params.id}, {...req.body, _id: req.params.id})
    .then(() => res.status(200).json({ message: "Objet modifié"}))
    .catch(errors => res.status(400).json({errors}))
})

app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id})
    .then(() => res.status(200).json({ message: "Objet Supprimé"}))
    .cactch(error => res.status(400).json({error}))
})

module.exports = app;
