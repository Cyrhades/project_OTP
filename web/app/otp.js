const { authenticator } = require('otplib');
const QRCode = require('qrcode');

exports.getUrl = (email, authenticatorName, secret) => {
    return QRCode.toDataURL(authenticator.keyuri(email, authenticatorName, secret)); 
}

exports.needAuth2FA = (req, res, next) => {
    if (typeof req.session !== 'undefined' && typeof req.session.user !== 'undefined'
         && req.session.user.connected_with_a2f != "1"
         && req.session.user.otp_enable == 1
         // si la route est egale à /signin/a2f ignorer
         && req.originalUrl != "/signin/a2f"
    ) {
        // On génére spéciquement un csrf pour a2f (quelque soit la route)
        require("./ho-csrf.js").token(req, res, next);
        return res.render('2fa', {
            page: "2fa",
            title: res.__('Welcome to DevSocial'), 
            error: null
        });
    } else {
        return next();
    }
};
