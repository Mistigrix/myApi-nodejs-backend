const express = require('express');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const { application } = require('express');

dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'rootpassword',
    port: null,
    database: 'test',
}

const app = express();

app.use(express.json());

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
            connection.query('SELECT * FROM users', [], (error, query) => {
                if (error) {
                    console.log(error);
                } else {
                    res.status(200).json(query);
                }
            })
        }
    })
})

// the route for get all products
app.get('/api/products', (req, res) => {
    req.getConnection((error, connection) => {
        if (error) {
            console.log(error);
        } else {
            connection.query('SELECT * FROM products', [], (error, query) => {
                if (error) {
                    res.status(400).json(error);
                } else {
                    res.status(200).json(query);
                }
            })
        }
    })
});

// the route for get a product
app.get('/api/products/:id', (req, res) => {
    req.getConnection((error, connection) => {
        if (error) {
            console.log(error);
        } else {
            connection.query('SELECT * FROM products WHERE id=' + req.params.id, [], (error, query) => {
                if (error) {
                    res.status(404).json(error); // return error status because the product is not found
                } else {
                    res.status(200).json({product: query}); // the product has been found, so return success status code and the object
                }
            })
        }
    })
});

// the route for add new product in the database
app.post('/api/products', (req, res) => {
    req.getConnection((error, connection) => {
        if (error) {
            console.log(error);
        } else {
            connection.query('INSERT INTO products(name, description, price, inStock) VALUES(?, ?, ?, ?)',[req.body.name, req.body.description, req.body.price, req.body.inStock], (error, query) => {
                if (error) {
                    res.status(400).json(error);
                } else {
                    res.status(201).json({ query });
                }
            })
        }
    })
});

// the route for modified product in the database
app.put('/api/products/:id', (req, res) => {
    req.getConnection((error, connection) => {
        if (error) {
            console.log(error);
        } else {
            connection.query('UPDATE products SET name=?, description=?, price=?, inStock=? WHERE id=?',[req.body.name, req.body.description, req.body.price, req.body.inStock, req.body._id], (error, query) => {
                if (error) {
                    res.status(400).json(error);
                } else {
                    res.status(201).json({message: 'Modified!' });
                }
            })
        }
    })
});

// the route for delete a product in the database
app.delete('/api/products/:id', (req, res) => {
    req.getConnection((error, connection) => {
        if (error) {
            console.log(error);
        } else {
            connection.query('DELETE FROM products WHERE id=?',[req.body._id], (error, query) => {
                if (error) {
                    res.status(400).json(error);
                } else {
                    res.status(201).json({message: 'Deleted!' });
                }
            })
        }
    })
});

PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("Server started at port: ", PORT));
