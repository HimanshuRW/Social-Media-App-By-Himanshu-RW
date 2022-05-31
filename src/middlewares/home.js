const UserDoc = require("../models/user");

async function home(req, res) {
    try {
        let activeUser = await UserDoc.findOne({ _id: req.body.userId });
        res.render("home", {
            myDp: activeUser.profilePic,
            myName: activeUser.name,
            myEmail: activeUser.email
        });
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = home;