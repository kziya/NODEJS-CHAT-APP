const { check } = require('express-validator');
const User = require('../../models/Users');

module.exports = [
    check('email').isEmail().withMessage('Invalid email format').custom(async(value) =>{
       let error;
        try{
            const user = await User.findOne({ email : value });
            if(user)
                error = new Error('User already exists!');
        }catch(e)
        {
            error = new Error('Something went wrong!');
        }
        if(error) throw error;
    
        return true;
    }),
    check('password').isLength({ min: 8 }).withMessage('Password must be longer than 7'),
    check('confirm_password').custom((value,{req}) =>{
        if(value !== req.body.password) 
            throw new Error('Password confirmation does not match password');
        return true;
    })
]