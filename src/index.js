require('dotenv').config();
require('express-async-errors');
const { StatusCodes } = require('http-status-codes');
const express   = require('express');
const app       = express();
//layout
const expressLayouts = require('express-ejs-layouts');
//set layout
app.set('layout', 'layouts/layout');
const port      = 3001;

app.use(expressLayouts);

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { verifyJWT } = require('../utils/jwt');
const jwt = require('jsonwebtoken');

const { attachCookiesToResponse } = require('../utils/');

const bcrypt = require('bcrypt');
const userSchema = require('./config');

const { uname } = require('../controllers/authController');


//convert form data to json
app.use(express.json());

//parse url encoded data
app.use(express.urlencoded({ extended: true }));

//morgan
app.use(morgan('dev'));

//cookie parser
app.use(cookieParser());

//ejs as view engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/login');
}
);

app.get('/signup', (req, res) => {
    res.render('signup');
}
);
// Set a local variable that will be available in all templates
app.locals.sharedVariable = 'Shared Content';

console.log('uname is', uname);

// Routes
const authRoutes = require('../routes/authRoutes');
//const userRoutes = require('./routes/userRoutes');
const authorRouter = require('../routes/authors');


// app.use((req, res, next) => {
//     // Capture the token from cookies
//     if (req.cookies && req.cookies.token1) {
//     const token = req.cookies.token1;
//     console.log('Token is:', token);  // Log the token to the console
//     const user1 = jwt.verify(token, process.env.JWT_SECRET);
//     user = user1.payload.name ;
//     console.log('User is:', user);  // Log the user to the console
//     // Make the token available in res.locals
//     res.locals.user = user;
//     }
//     else {
//     res.locals.user = null;
//     }
// next();
// });



app.use('/auth', authRoutes);
app.use('/authors', authorRouter);
//app.use('/users', userRoutes);



//extract user from token1


// //register user
// app.post("/signup", async (req, res) => {
//     try {
//         //const hashedPassword = await bcrypt.hash(req.body.password, 10);
//             const user = new userSchema({
//             name: req.body.name,
//             password: req.body.password
//             //password: hashedPassword
//         });
//         await user.save();
//         res.redirect('/');
//     } catch (err){
//         console.log(err);
//         res.redirect('/signup');
//     }
//     console.log(req.body);
// }
// );


//login user check
// app.get('/login', (req, res) => {
//     const token = req.cookies.token1;
//     if (!token) 
//         {
//             console.log('no token');
//             res.render('login');
//         }
//     else {
//         try {
//             const user = jwt.verify(token, process.env.JWT_SECRET);
//             console.log(user);
//             //invalid token
//             if (!user) {
//                 res.redirect('/login');
//             }
//             else {
//                 res.render('home');
//             }
//         } catch (err) {
//             //res.redirect('/login')
//             res.redirect('/logout')
//             console.log(err);
            
//         }
//     }
// });
    



// //login user
// app.post("/login", async (req, res) => {
//     const user = await userSchema.findOne({ name: req.body.name });
//     if (user == null) {
//         return res.status(400).send('Cannot find user');
//     }
//     try {
//         if (await bcrypt.compare(req.body.password, user.password)) {
//             //res.render('home');
//         const tokenuser = { name: user.name, role: user.role };
//         attachCookiesToResponse({ res, token: tokenuser });
//         //res.status(StatusCodes.OK).json({ user: tokenuser });
//         tk=req.cookies.token1;
//         console.log(tk);
//         res.render('home');
//         } else {
//             res.send('Incorrect password');
//         }
//     } catch(err) {
//         res.status(500).send();
//         console.log(err);
//         }
    
//     });

//     //all users
// app.get('/users', async (req, res) => {
//     const token = req.cookies.token1;
//     if (!token) 
//         {
//             console.log('no token');
//             res.redirect('/login');
//         }
//     else {
//         try {
//             const user = jwt.verify(token, process.env.JWT_SECRET);
//             //console.log(user);
//             //invalid token
//             if (!user) {
//                 res.redirect('/login');
//             }
//             else {
//                 const users = await userSchema.find();
//                 res.json(users);
//             }
//         } catch (err) {
//             res.redirect('/logout')
//             console.log(err);
//         }
//     }
    
// }
// );

// //get user by id
// app.get('/users/:id', async (req, res) => {
//     const user = await userSchema.findById(req.params.id);
//     res.json(user);
// }
// );

// //show current user
// app.get('/me', async (req, res) => {
//     const token = req.cookies.token1;
//     if (!token) 
//         {
//             console.log('no token');
//             res.redirect('/login');
//         }
//     else {
//         try {
//             const user = jwt.verify(token, process.env.JWT_SECRET);
//             //console.log(user);
//             //invalid token
//             if (!user) {
//                 res.redirect('/login');
//             }
//             else {
//                 res.json(user);
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     }
    
// }
// );

//logout user
// app.get('/logout', (req, res) => {
//     res.clearCookie('token1');
//     res.redirect('/login');
// }
// );

// Error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
