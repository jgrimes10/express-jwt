const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
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
                    return res.status(200).json({
                        success: 'Welcome to the JWT Auth'
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

module.exports = router;
