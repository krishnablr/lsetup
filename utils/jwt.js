const jwt = require('jsonwebtoken');
const createJWT = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

const verifyJWT = ({ token }) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

const attachCookiesToResponse = ({ res, user }) => {
    const token = createJWT({ payload: user });
    //const oneDay = 1000 * 60 * 60 * 24;
    //const fiveMinutes = 1000 * 60 * 5;
    const never = 1000 * 60 * 60 * 24 * 365 * 100;
    //console.log('Token:', token);
    res.cookie('token1', token, {
        httpOnly: true,
        expires: new Date(Date.now() + never),
        secure: process.env.NODE_ENV === 'production',
        signed: false
    });

    //res.status(201).json({ user });
}



module.exports = { createJWT, verifyJWT, attachCookiesToResponse };

