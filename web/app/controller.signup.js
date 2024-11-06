const bcrypt = require('bcrypt');
const { generateApiKey } = require('generate-api-key');
const { authenticator } = require('otplib');

exports.get = (req, res) => {
    res.render('signup', {
        page: "signup",
        title: res.__('Welcome to DevSocial'),
        username: "", 
        email:"", 
        error: null
    });
};

async function controlData(data) {
    const { username, email, password } = data;

    // Validation des champs
    if (!username || username.length < 3 || username.length > 40) {
        return { valid: false, message: 'Invalid username. It must contain between 3 and 40 characters.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return { valid: false, message: 'Invalid email.'  };
    }

    if (!password || password.length < 6) {
        return { valid: false, message: 'Invalid password. It must contain at least 6 characters.' };
    }

    return { valid: true };
}

exports.post = async (req, res) => {
    let {username, email, password} = req.body;
    const validation = await controlData({ username, email, password });

    if (!validation.valid) {     
        return res.render('signup', {
            page: "signup",
            title: res.__('Welcome to DevSocial'),
            error: res.__(validation.message),
            username: username, 
            email: email
        });  
    }
 
     // Hacher le mot de passe avant de le stocker
     const saltRounds = 10;
     bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).send(res.__('Server error'));
        }
       
        require("./repo.user.js").add(username, email, hash, generateApiKey({ method: 'base32' }), authenticator.generateSecret()).then((result) => {
            // Ajouter flash session
            req.flash('notify', res.__('You are now registered.'));
            res.redirect('/signin'); // Redirige vers la page de profil après l'inscription
        }).catch(error => {
            if(error.code == 'ER_DUP_ENTRY') { 
                res.render('signup', {
                    page: "signup",
                    title: res.__('Welcome to DevSocial'),
                    error: res.__("This username or email already exists in our database"),
                    username: username, 
                    email: email
                });
            } else {
                res.render('signup', {
                    page: "signup",
                    title: res.__('Welcome to DevSocial'),
                    error: res.__("Verify your data and try again"),
                    username: username, 
                    email: email
                });
            }
        })
    });
};

