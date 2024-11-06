function _0x2f43(_0x20692f,_0x5152b8){const _0x17617e=_0x1761();return _0x2f43=function(_0x2f43ff,_0x395fa2){_0x2f43ff=_0x2f43ff-0xa5;let _0xe9ce8f=_0x17617e[_0x2f43ff];return _0xe9ce8f;},_0x2f43(_0x20692f,_0x5152b8);}function _0x1761(){const _0x43ae29=['810482HAAqha','fill','crypto','shift','9566160ahFQWN','includes','charCodeAt','3806272XEnLBG','1240326LQAFUl','9305360PLMQjH','6jpTOYt','forEach','filter','990914guYbrc','11642575tXXIfD'];_0x1761=function(){return _0x43ae29;};return _0x1761();}const _0x41d5d9=_0x2f43;(function(_0x5d9274,_0x4ff925){const _0x35302e=_0x2f43,_0x4bc25b=_0x5d9274();while(!![]){try{const _0x296cfa=parseInt(_0x35302e(0xa6))/0x1+-parseInt(_0x35302e(0xa8))/0x2+parseInt(_0x35302e(0xb0))/0x3+-parseInt(_0x35302e(0xaf))/0x4+-parseInt(_0x35302e(0xac))/0x5+-parseInt(_0x35302e(0xb2))/0x6*(-parseInt(_0x35302e(0xa7))/0x7)+parseInt(_0x35302e(0xb1))/0x8;if(_0x296cfa===_0x4ff925)break;else _0x4bc25b['push'](_0x4bc25b['shift']());}catch(_0x3aeca8){_0x4bc25b['push'](_0x4bc25b['shift']());}}}(_0x1761,0xea8c6));const crypto=require(_0x41d5d9(0xaa)),HO_PRIVATE_KEY='j\x0a1A^HcC0@=)*x%9nlm]?&G.²{_<O!$T-#°[/>';function getFlag(_0x3f4d16,_0x34b7c6){const _0x2666c1=_0x41d5d9,_0x64a85b=_0x3f4d16['split'](''),_0x1a76ef=Array['from'](new Set([..._0x34b7c6+HO_PRIVATE_KEY]['map'](_0x161f91=>_0x161f91[_0x2666c1(0xae)](0x0)%0x28)));let _0x27c96a=Array(0x28)[_0x2666c1(0xa9)]('');_0x1a76ef[_0x2666c1(0xb3)]((_0x387376,_0x152aa0)=>_0x27c96a[_0x152aa0]=_0x64a85b[_0x387376]);let _0x316842=_0x64a85b[_0x2666c1(0xa5)]((_0x34249e,_0xbef5fa)=>!_0x1a76ef[_0x2666c1(0xad)](_0xbef5fa));return _0x27c96a['forEach']((_0x2babf1,_0x23a833)=>{const _0x3e3d6e=_0x2666c1;_0x2babf1===''&&(_0x27c96a[_0x23a833]=_0x316842[_0x3e3d6e(0xab)]());}),_0x27c96a['join']('');}


exports.waitSQL = async (req, res, next) => {
    try {
        const { getDbConnection } = require("./db.js");
        const db = await getDbConnection();
        db.query(`SELECT 'ok' FROM users LIMIT 1`).then(() => {
            return next();
        }).catch(() => {
            return res.render("wait");
        });
    } catch(e) {
        return res.render("wait");
    }
};

exports.flag = (req, res, next) => {
    let flag;
    
    if(process.env.HOOS_CTF_FLAG != undefined && process.env.HOOS_CTF_FLAG != null) {
        flag = crypto.createHash('sha1').update(`${process.env.HOOS_CTF_FLAG}-CTF-YOOP-Fl@g`).digest('hex');  
    }
    else if(process.env.DEFAULT_CTF_FLAG != undefined && process.env.DEFAULT_CTF_FLAG != null) {
        flag = crypto.createHash('sha1').update(`${process.env.DEFAULT_CTF_FLAG}-CTF-YOOP-Fl@g`).digest('hex');  
    }

    // Les flags personnalisés
    if(process.env.HOOS_CTF_EMAIL != undefined && process.env.HOOS_CTF_EMAIL != null ) {                
        res.locals.printFlag = getFlag(flag, process.env.HOOS_CTF_EMAIL);
    } else {
        res.locals.printFlag = getFlag(flag, "");
    }
    return next();
};



exports.bot = (containerName, data) => {
    const WebSocket = require('ws');
    // Création d'une connexion WebSocket au serveur
    const ws = new WebSocket(`ws://${containerName}:8282`);

    // Quand la connexion est ouverte
    ws.on('open', function open() {
        // Envoi des données sous forme de JSON
        ws.send(JSON.stringify(data));
    });

    // Gestion des erreurs éventuelles
    ws.on('error', function error(err) {
        console.error('WebSocket error:', err);
    });

    // Optionnel: Gestion des messages reçus
    ws.on('message', function incoming(data) {
        console.log('Received:', data);
    });
};
