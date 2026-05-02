const User = require('../models/user-model');

exports.home = (req, res) => res.send('NOT IMPLEMENTED');

exports.stats = (req, res) => {
    req.session.visit_count = req.session.visit_count + 1 || 1;
    res.send('Number of visits: ' + req.session.visit_count);
}

exports.registerGet = (req, res) => {
    res.render("register")
};

exports.registerPost = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;

    try{
        let newUser = {
            username: username,
            password: password,
            role:role
        }
        let result = await User.addUser(newUser)
        console.log(result)
        res.redirect("/login")
    }
    catch(error){
        console.log(error)
    }

};

exports.loginGet = (req, res) => {
    res.render("login")
};

exports.loginPost = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    try{
        let user = await User.findUser({username})

        if(!user){
            return res.redirect("/login")
        }

        if(password == user.password){
            if(user.role == "admin"){
                res.redirect("/admin-profile")
            }
            else{
                res.redirect("/profile")
            }
        }
        else{
            res.redirect("/login")
        }

    }
    catch(e){
        res.send(e)
    }

};

exports.profile = (req, res) => res.send('NOT IMPLEMENTED');

exports.adminProfile = (req, res) => res.send('NOT IMPLEMENTED');

exports.logout = (req, res) => res.send('NOT IMPLEMENTED');
