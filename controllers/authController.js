const express   = require('express');
const app       = express();
const bcrypt = require('bcrypt');

const userSchema = require('../src/config')
const { StatusCodes } = require('http-status-codes');

//parse url encoded data
app.use(express.urlencoded({ extended: true }));

const jwt = require('jsonwebtoken');

const { attachCookiesToResponse } = require('../utils');

const cookieParser = require('cookie-parser');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());


const loging = async (req, res) => {
    const token = req.cookies.token1;
    if (!token) 
        {
            console.log('no token');
            res.render('login', {layout: 'layouts/show'});
        }
    else {
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            console.log('user is', user);
            //print only the username which is in user variable
            console.log('user name is', user.payload.name);
            
            
            //invalid token
            if (!user) {
                res.redirect('login');
            }
            else {
                //res.render('home');
                //parameter for the home page
                uname = user.payload.name;
                res.render('home', {name: user.payload.name});
                // save user.payload.name in a variable and use it in other ejs files
                //saveName = user.payload.name;
                // module.exports = {
                //     uname
                //   };
                
            }
        } catch (err) {
            //res.redirect('/login')
            res.redirect('logout')
            console.log(err);
            
        }
    }
}

// const register = async (req, res) => {
    
//     //conditional check for email already exists
//     const { email,name,password } = req.body;
//     const emailAlreadyExists = await userSchema.findOne({email})
//     if (emailAlreadyExists) {
//         throw new CustomError.BadRequestError('Email already exists');
//     }

//     //first user register as an admin
//     const isFirstUser = (await userSchema.countDocuments({})) === 0;
//     const role = isFirstUser ? 'admin' : 'user';

//     //create the user and response code
//     const user = await userSchema.create({ email, name, password, role });
    
//     const tokenuser = { name: user.name, email: user.email, role: user.role };
//     attachCookiesToResponse({ res, token: tokenuser });
//     res.status(StatusCodes.CREATED).json({ user: tokenuser });
// }

const loginp = async (req, res) => {
    
//     const { email, password } = req.body;
//     if (!email || !password) {
//         throw new CustomError.BadRequestError('Please provide email and password');
//     }

//     const user = await userSchema.findOne({ email });
//     if (!user) {
//         throw new CustomError.UnauthenticatedError('Invalid User Credentials');
//     }

//     const isPasswordCorrect = await user.matchPasswords(password);
//     if (!isPasswordCorrect) {
//         throw new CustomError.UnauthenticatedError('Invalid Password Credentials');
//     }

//     const tokenuser = { name: user.name, email: user.email, role: user.role };
//     attachCookiesToResponse({ res, token: tokenuser });
//     res.status(StatusCodes.OK).json({ user: tokenuser });

// };

// app.post("/signup", async (req, res) => 
    const user = await userSchema.findOne({ name: req.body.name });
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            //res.render('home');
        const tokenuser = { name: user.name, role: user.role };
        attachCookiesToResponse({ res, user: tokenuser });
        //res.status(StatusCodes.OK).json({ user: tokenuser });
        //tk=res.cookies.token1;
        //console.log('tk:',tk);
        //res.render('home');
        //console.log('user is from post', user.name);
        //make user.name available to all ejs files
        uname = user.name;
        console.log('user name is', user.name);
        res.render('home', {name: user.name});
        
        } else {
            res.send('Incorrect password');
        }
    } catch(err) {
        //res.status(500).send();
        res.redirect('logout')
        console.log(err);
        }
    
    }

const logout = async (req, res) => {
    //res.clearCookie('token1');
    //also expire the token
    res.clearCookie('token1', { expires: new Date() });
    res.redirect('login');
  }
    
  //res.status(StatusCodes.OK).json({ msg: 'User logged out' });

module.exports = {
    loging,
    loginp,
    logout
};
