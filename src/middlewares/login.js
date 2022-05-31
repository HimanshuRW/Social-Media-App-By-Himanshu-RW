const UserDoc = require("../models/user");
const bcrypt = require('bcrypt');

async function checkPresence(email) {
    let result = await UserDoc.find({ email });
    if (result.length == 0) {
        return false;
    } else {
        return true;
    }
}

async function login(req, res,next){
    let userPresence = await checkPresence(req.body.email);
    if (userPresence) {
        let user = await UserDoc.findOne({email:req.body.email});
        let match = await bcrypt.compare(req.body.pass,user.password);
        if (match) {
            res.locals.userId = user._id;
            next();
        } else {
            res.render("login",{
                display:"block"
            })
        }
    } else {
        res.render("login",{
            display:"block"
        })
    }
}

module.exports = login;