// GET
module.exports.index = (req,res) =>{
    return res.render('index');
};


module.exports.login = (req,res) =>{
    return res.render('login');
}

module.exports.signUp = (req,res) =>{
    return res.render('sign-up');
}

//POST