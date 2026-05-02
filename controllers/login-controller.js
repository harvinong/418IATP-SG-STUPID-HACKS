exports.loginGet = (req, res) => {
    res.render("login", { error: null });
};

exports.loginPost = (req, res) => {
    res.send("loginPost not implemented");
};

exports.registerGet = (req, res) => {
    res.render("register");
};

exports.registerPost = (req, res) => {
    res.send("registerPost not implemented");
};