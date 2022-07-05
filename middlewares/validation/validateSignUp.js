const { check } = require('express-validator');
const User = require('../../models/Users');

module.exports = [
    check('email').isEmail().withMessage('Invalid email format').custom(value =>{
        try{
            const user = User.find({ email : value });
            if(!user)
                throw new Error('User already exists!');
        }catch(e)
        {
            throw new Error('Something went wrong!');
        }
        return true;
    }),
    check('password').isLength({ min: 8 }).withMessage('Password must be longer than 7'),
    check('confirm_password').custom((value,{req}) =>{
        if(value !== req.body.password) 
            throw new Error('Password confirmation does not match password');
        return true;
    })
]