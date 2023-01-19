const bcrypt = require('bcrypt');

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        req.getConnection((error, connection) => {
            if (error) {
                res.status(500).json(error);
            } else {
                connection.query('INSERT INTO users(email, password) VALUES (?, ?)', [req.body.email, hash], (error, query) => {
                    if (error) {
                        res.status(500).json(error);
                    } else {
                        res.status(201).json({message: "User"});
                    }
                })
            }
        })
    })
    .catch(error => res.status(200).json(error))
};


exports.login = (req, res) => {
    req.getConnection((error, connection) => {
        if (error) {
            res.status(500).json(error);
        } else {
            connection.query('SELECT * from users WHERE email= ?', [req.body.email], (error, query) => {
                if (error) {
                    res.status(500).json(error);
                } else {
                    if (query === null) {
                        res.status(401).json({message: "Your email or password is not correct"});
                    } else {
                        bcrypt.compare(req.body.password, query.password)
                        .then((isValid) => {
                            if (!isValid) {
                                return res.status(401).json({ message: "Your email or password is not correct blallal" });
                            }

                            res.status(200).json({
                                userId: query.id,
                                token: "TOKEN"
                            })
                        })
                        .catch((error) => res.status(401).json({ error }))
                    }
                }
            });
        }
    });
}