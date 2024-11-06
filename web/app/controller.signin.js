const bcrypt = require('bcrypt');
const { authenticator } = require('otplib');

const connecta2f = (req, res) => {
    if(req.session && req.session.user && parseInt(req.session.user.id) > 0) {
        if(req.session.user.username && req.body.otp_code != undefined) {
            const isValid = authenticator.check(req.body.otp_code, req.session.user.otp_secret);
            if(isValid) {        
                req.session.user.connected_with_a2f = "1"; 
                req.session.user.connected = "1";
                req.flash('notify', res.__('You are now authenticated.'));
                return res.redirect('/profile');               
            } else {
                req.flash('error', res.__('Error validating your code.'));
                return res.redirect('/');
            }
        } else {
            req.flash('error', res.__('Error validating your code.'));
            return res.redirect('/');
        }
    } else {
        return res.redirect('/');
    }
};

const cancela2f = (req, res) => {
    delete req.session.user;
    req.flash('notify', res.__('Cancel connection'));
    return res.redirect('/');
};


exports.get = (req, res) => {
    if(req.session && req.session.user && parseInt(req.session.user.id) > 0) {
        return res.redirect("/");
    }
    res.render('signin', { 
        page: "signin",
        title: res.__('Login'),
        username: "", 
        error: null
    });
};

exports.post = async (req, res) => {
    const { username, password } = req.body;
    try {
        require("./repo.user.js").getByUsername(username).then((user) => {
            // Vérifier le mot de passe
            if (!bcrypt.compareSync(password, user.password)) {
                throw new Error("INCORRECT PASSWORD");
            }
            delete user.password;
            req.session.user = user;
            if(req.session.user.otp_enable == 1) {
                req.flash('notify', res.__('You are now authenticated. But you must validate double authentication'));
            }
            else{
                req.session.user.connected = "1";
                req.flash('notify', res.__('You are now authenticated.'));
            }
            res.redirect('/');
        }).catch(error =>{
            res.status(401).render('signin', {
                page: "signin",                
                title: res.__('Welcome to DevSocial'),
                error: res.__("Incorrect identification"),
                username: username
            });
        });
    } catch (error) {
        res.status(401).render('signin', {
            page: "signin",
            title: res.__('Welcome to DevSocial'),
            error: res.__("Incorrect identification"),
            username: username
        });
    }
};

exports.postA2F = async (req, res) => {
    // Spécifique A2F
    if(req.session && req.session.user && parseInt(req.session.user.id) > 0 && req.session.user.username && req.body.otp_code != undefined) {
        return connecta2f(req, res);
    }
    // annuler la connexion
    else if(req.session && req.session.user && parseInt(req.session.user.id) > 0 && req.session.user.username && req.body.stop_2fa != undefined) {
        return cancela2f(req, res);
    }
    else {
        return res.redirect('/');
    }
}

exports.disconnect = (req, res) => {
    delete req.session.user;
    req.flash('notify', res.__('You are now disconnected.'));
    res.redirect('/');
};
