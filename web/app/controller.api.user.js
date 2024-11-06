const repoUser = require("./repo.user.js");
exports.get = async (req, res) => { 
    if(req.headers['api-key'] != undefined) {
        if (await repoUser.isAdminByApiKey(req.headers['api-key']) === true) {
            if (req.params.username) {
                repoUser.getByUsername(req.params.username).then((user) => {
                    delete user.password;
                    return res.status(200).json({"status": "200", 
                        "data": user
                    });
                }).catch(error =>{
                    // 404 utilisateur inexistant
                return res.status(404).json({"status": "404", "message": "Not Found"});
                });
            } else {
                return res.status(400).json({"status": "400", "message": "Bad Request"});
            }  
        } 
        else {
            return res.status(403).json({"status": "403", "message": "Forbidden"});
        }
    } else {
        return res.status(403).json({"status": "403", "message": "Forbidden"});
    }
};


exports.validAccount = async (req, res) => { 
    if(req.headers['api-key'] != undefined) {
        if (await repoUser.isAdminByApiKey(req.headers['api-key']) === true) {
            if (req.params.username) {
                repoUser.getByUsername(req.params.username).then((user) => {
                    if(user.activated == "0") {
                        repoUser.activeAccount(req.params.username).then(() => {
                            return res.status(200).json({"status": "200", "message": "user activated"});
                        });
                    } else{
                        return res.status(400).json({"status": "400", "message": "user already activated"});
                    }
                }).catch(error =>{
                    // 404 utilisateur inexistant
                    return res.status(404).json({"status": "404", "message": "Not Found"});
                });
            } else {
                return res.status(400).json({"status": "400", "message": "Bad Request"});
            }  
        } 
        else {
            return res.status(403).json({"status": "403", "message": "Forbidden"});
        }
    } else {
        return res.status(403).json({"status": "403", "message": "Forbidden"});
    }
};

