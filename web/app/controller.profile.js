const { authenticator } = require('otplib');

exports.get = (req, res) => {
    let username;
    if(req.session.user.username) {
        if(req.params.username) {        
            username = req.params.username;
        } else {
            username = req.session.user.username;
        }
        require("./repo.user.js").getByUsername(username).then((user) => {
            require('./otp.js').getUrl(user.email, `DevSocial ${user.username}`, user.otp_secret).then((qrcode) => {
                return res.render('profile', { 
                    page: "profile",
                    title: res.__('Welcome to DevSocial'),
                    profil : user,
                    qrcode,
                    account: user.email,
                    key: user.otp_secret
                });
            }).catch(error =>{
                req.flash('error', res.__('An error has occurred.'));
                return res.redirect('/');
            });
        }).catch(error =>{
            req.flash('error', res.__('An error has occurred.'));
            return res.redirect('/');
        });
    } else {
        req.flash('error', res.__('An error has occurred.'));
        return res.redirect('/');
    }
};

exports.post = (req, res) => {
    if(req.session.user.username && req.body.otp_code != undefined) {
        const isValid = authenticator.check(req.body.otp_code, req.session.user.otp_secret);
        if(isValid) {
            require("./repo.user.js").enableOTP(req.session.user.username).then(() => {
                req.flash('notify', res.__('Your modification has been taken into account.'));
                return res.redirect('/profile');
            }).catch(error => {
                req.flash('error', res.__('An error has occurred.'));
                return res.redirect('/profile');
            })
        } else {
            req.flash('error', res.__('Error validating your code.'));
            return res.redirect('/profile');
        }
    } else {
        req.flash('error', res.__('An error has occurred.'));
        return res.redirect('/profile');
    }
};


exports.botConnect = (req, res) => {
    require("./repo.user.js").getByUsername('Admin').then((user) => {
        delete user.password;
        req.session.user = user;
        res.status(200).send('ok');
    }).catch(error => {
        res.status(400).send('ko');
    })
};