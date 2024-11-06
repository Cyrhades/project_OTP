exports.get = (req, res) => {
    res.render('index', { 
        page: "index",
        title: res.__('Welcome to DevSocial')
    });
};