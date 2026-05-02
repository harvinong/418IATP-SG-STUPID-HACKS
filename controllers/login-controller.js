exports.login = (req, res) => {
    res.render("login", {error: null});
}

exports.register = (req, res) => {
    res.send("REGISTER not implemented");
}