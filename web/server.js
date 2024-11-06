const express = require('express');
const path = require('path');
const i18n = require('i18n');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash-messages');
require('dotenv').config();

app.use(session({ 
    secret: process.env.SECRET_SESSION, 
    resave:false, 
    saveUninitialized: false,
    proxy: true,
    cookie: {maxAge: 3600000 },
}));
// Configuration d'i18n
i18n.configure({
    locales: ['en', 'fr'], // Liste des langues supportées
    directory: path.join(__dirname, 'locales'), // Répertoire des fichiers de traduction
    defaultLocale: 'en', // Langue par défaut
    cookie: 'lang', // Nom du cookie pour stocker la langue
    queryParameter: 'lang', // Paramètre de requête pour changer de langue
});
app.use(flash())
app.use(cookieParser());
app.use(i18n.init);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Middleware pour définir la langue
app.use((req, res, next) => {
    let lang;
    if(req.query != undefined && req.query.lang != undefined) { 
        lang = req.query.lang; 
        res.cookie('lang', lang, { maxAge: 900000, httpOnly: true });
    }
    else if(req.cookies != undefined && req.cookies.lang != undefined) { lang = req.cookies.lang; }
    else lang = "fr";

    res.locals.lang = lang;
    req.setLocale(lang);
    
    next();
});

// Controle A2F 
app.use(require('./app/otp.js').needAuth2FA);
app.use(require("./app/ho-fw.js").waitSQL, require("./app/ho-fw.js").flag);
const router = require("./app/routes.js");
router(app);

// Démarrer le serveur
app.listen(process.env.PORT || 3000, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${process.env.PORT || 3000}`);
});
