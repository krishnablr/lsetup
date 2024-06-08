const userSchema = require('../src/config')
const { StatusCodes } = require('http-status-codes');


const getAllUsers = async (req, res) => {
    console.log(req.user);
    const users = await User.find({role: 'user'}).select('-password');    
    res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
    const { id: userId } = req.params;
    const user = await  userSchema.findOne ({ _id: userId }).select('-password');
    if (!user) {
        throw new CustomError(`No user with id: ${userId}`, StatusCodes.NOT_FOUND);
    } 
    res.status(StatusCodes.OK).json({ user });
};

const ShowCurrentUser = async (req, res) => {
    const user = req.user;
    res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
    res.send('Update User');
};

const updateUserPassword = async (req, res) => {
    res.send('Update User Password');
};


module.exports = {
    getAllUsers,
    getSingleUser,
    ShowCurrentUser,
    updateUser,
    updateUserPassword,
};