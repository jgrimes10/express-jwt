const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

router.post('/', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const user = new User({
                email: req.body.email,
                password: hash
            });

            user.save().then(result => {
                res.status(201).send(result);
            }).catch(err => {
                res.status(500).json({
                    error: err
                });
            });
        }
    });
});

router.post('/signin', (req, res) => {
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }
                if (result) {
                    const JWTToken = jwt.sign({
                            email: user.email,
                            _id: user._id
                        },
                        'secret',
                        {
                            expiresIn: '2h'
                        });
                    return res.status(200).json({
                        success: 'Welcome to the JWT Auth',
                        token: JWTToken
                    });
                }

                return res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get('/', (req, res) => {
    if (!req.body.token) {
        return res.status(401).json({
            failed: 'Unauthorized Access'
        });
    }

    jwt.verify(req.body.token, 'secret', (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        User.find({}, (error, users) => {
            if (error) {
                return res.status(500).send(error);
            }

            return res.status(200).send(users);
        });
    });
});

module.exports = router;
