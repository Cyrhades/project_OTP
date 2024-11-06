const csrf = require('./ho-csrf.js');
const auth = require('./auth.middleware.js');

module.exports = (app) => {
   // Route pour la page d'accueil
    app.get('/', require("./controller.home.js").get);
   
    // Route GET pour la page d'inscription
    app.get('/signup', auth.needNoAuth, csrf.token, require("./controller.signup.js").get);
    // Route POST pour gérer les données du formulaire d'inscription
    app.post('/signup', auth.needNoAuth, csrf.verify, require("./controller.signup.js").post);

    // Route GET pour la page de connexion
    app.get('/signin', auth.needNoAuth, csrf.token, require("./controller.signin.js").get);
    // Route POST pour gérer les données du formulaire de connexion
    app.post('/signin', auth.needNoAuth, csrf.verify, require("./controller.signin.js").post);
    // A2F
    app.get('/signin/a2f', (req, res) => res.redirect('/'));
    app.post('/signin/a2f', auth.needNoAuth, csrf.verify, require("./controller.signin.js").postA2F);

    // Disconnect
    app.get('/disconnect', auth.needAuth, require("./controller.signin.js").disconnect);

    // Route pour la page de profil
    app.get('/profile', auth.needAuth, csrf.token, require("./controller.profile.js").get);

    app.post('/profile', auth.needAuth, csrf.verify, require("./controller.profile.js").post);
    
}