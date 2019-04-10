var express = require("express")
var router = express.Router()



module.exports.authenticated = function(req,res,next) {
    req.session.isLoggedIn = req.session.isLoggedIn ? true : false;
    if(req.session.isLoggedIn) {
        res.locals.user = req.session.user;
        next();
    }else {
        next();
    }
    
}

module.exports = router;