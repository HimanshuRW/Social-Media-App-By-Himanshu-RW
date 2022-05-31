const UserDoc = require("../models/user");

async function checkPresence(email) {
    let result = await UserDoc.find({ email });
    if (result.length == 0) {
        return false;
    } else {
        return true;
    }
}

async function register(req,res,next) {
    try {
        let userPresent = await checkPresence(req.body.email);
    if (userPresent) {
        res.render("register", {
            display: "block",
            errMsg: "User already registered !!!!"
        })
    } else {
        if (req.body.pass == req.body.re_pass) {
            const newUser = new UserDoc({
                name:req.body.name,
                email:req.body.email,
                password:req.body.pass,
                gender:req.body.gender,
                profilePic:req.body.avatar,
                friends:[],
                requests:[]                
            });
            // --- save id to local stroage --
            let userId = newUser._id.toString();

            // -- register to db --
            await newUser.save();
            res.locals.userId = userId;
            next();
        } else {
            res.render("register", {
                display: "block",
                errMsg: "Password and cofirm Password not matching"
            })
        }

    }
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = register;