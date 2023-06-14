const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const jwtSecretKey = process.env.APP_JWT_SECRET_KEY;

const UserModel = require("../models/Users");

router.post('/register', (req, res, next) => {
    const password = req.body.password;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {

            const user = new UserModel({
                ...req.body,
                password: hash,
                verified: false
            });
            await user.save();
            return res.status(201).json(user);
        });
    });

})

// router.post('/login', async (req, res, next) => {
//     const username = req.body.username;
//     const userLogin = await UserModel.findOne({ username: username });
//     if (userLogin) {
//         // controllo la password
//         const log = bcrypt.compare(req.body.password, userLogin.password)
//         if (log) {
//             // Generare un JWT Token
//             const token = jwt.sign(
//                 {
//                     id: userLogin._id,
//                     username: userLogin.username,
//                     email: userLogin.email,

//                 },
//                 jwtSecretKey,
//                 /*exp: Math.floor(Date.now() / 1000) + (60 * 60), equivalente a expiresIn*/
//                 { expiresIn: '1h' });
//             return res.status(200).json(token)
//         } else {
//             return res.status(400).json({ error: 'Invalid Password' })
//         }
//     } else {
//         return res.status(400).json({ error: 'Invalid Username' })
//     }
// })

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const userLogin = await UserModel.findOne({ username: username });

        if (userLogin) {
            const log = await bcrypt.compare(password, userLogin.password);

            if (log) {
                const token = jwt.sign(
                    {
                        id: userLogin._id,
                        username: userLogin.username,
                        email: userLogin.email,
                    },
                    jwtSecretKey,
                    { expiresIn: '1h' }
                );

                return res.status(200).json(token);
            } else {
                return res.status(400).json({ error: 'Invalid password' });
            }
        } else {
            return res.status(401).json({ error: 'Invalid username' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;


