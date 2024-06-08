const express = require('express');
const router = express.Router();

const { loging, loginp, logout } = require('../controllers/authController');

//router.post('/register', register);
router.get('/login', loging);
router.post('/login', loginp);
router.get('/logout', logout);

module.exports = router;
