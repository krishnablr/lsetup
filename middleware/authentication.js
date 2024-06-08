//create content of authenticaion.js
const jwt = require('jsonwebtoken');

const { attachCookiesToResponse } = require('../utils/');
const {verifyJWT} = require('../utils/');

const cookieParser = require('cookie-parser');



//middleware to authenticate user

const authenticateUser = (req, res, next) => {
    const token = req.cookies.token1;
    if (!token) {
        console.log('no token');
        //res.render('login', {layout: 'layouts/show'});
        res.redirect('/auth/logout');
    }
    else {
        try {
            const user = verifyJWT({ token });
            console.log(user);
            //invalid token
            if (!user) {
                //res.render('login', {layout: 'layouts/show'});
                res.redirect('/auth/logout');
            }
            else {
                console.log(user)
                next();
                console.log('user authenticated');
            }
        } catch (err) {
            //res.redirect('/login')
            res.redirect('/auth/logout');
            console.log(err);
        }
    }
}

module.exports = { authenticateUser };
//
