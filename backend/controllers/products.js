exports.getAllProducts = (req, res) => {
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
}

exports.getOneProduct = (req, res) => {
    req.getConnection((error, connection) => {
        if (error) {
            console.log(error);
        } else {
            connection.query('SELECT * FROM products WHERE id=' + req.params.id, [], (error, query) => {
                if (error) {
                    res.status(404).json(error); // return error status because the product is not found
                } else {
                    if (query.length > 0) {
                        res.status(201).json({product: query});
                    } else {
                        res.status(404).json({error: {message:"No such product"}});
                    } // the product has been found, so return success status code and the object
                }
            })
        }
    })
}

exports.AddProduct = (req, res) => {
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
}

exports.updateProduct = (req, res) => {
    req.getConnection((error, connection) => {
        if (error) {
            console.log(error);
        } else {
            connection.query('UPDATE products SET name=?, description=?, price=?, inStock=? WHERE id=?',[req.body.name, req.body.description, req.body.price, req.body.inStock, req.params.id], (error, query) => {
                if (error) {
                    res.status(400).json(error);
                } else {
                    res.status(201).json({message: 'Modified!' });
                }
            })
        }
    })
}

exports.deleteProduct = (req, res) => {
    req.getConnection((error, connection) => {
        if (error) {
            console.log(error);
        } else {
            connection.query('DELETE FROM products WHERE id=?',[req.params.id], (error, query) => {
                if (error) {
                    res.status(400).json(error);
                } else {
                    res.status(201).json({message: 'Deleted!' });
                }
            })
        }
    })
}
