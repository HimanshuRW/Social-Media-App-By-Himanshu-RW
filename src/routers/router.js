const express = require('express');
const router = new express.Router();
const UserDoc = require("../models/user");
const register = require("../middlewares/register");
const login = require("../middlewares/login");
const home = require("../middlewares/home");
const save = require("../middlewares/save");
const someUser = require("../middlewares/someUser");


async function checkPresence(email) {
    let result = await UserDoc.find({ email });
    if (result.length == 0) {
        return false;
    } else {
        return true;
    }
}
async function getDetails(friend) {
    let friendAccount = await UserDoc.findOne({ email: friend.email });
    return {
        dp: friendAccount.profilePic,
        name: friendAccount.name,
        email: friendAccount.email
    }
}

// --api--
// get frnds
// post present
// get requests
// post reuests
// post sendRequest

router.get("/friends/:id", async (req, res) => {
    let userId = req.params.id;
    let user = await UserDoc.findOne({ _id: userId });
    let toSend = await Promise.all(user.friends.map(getDetails));
    res.send(toSend);
});
router.get("/requests/:id", async (req, res) => {
    let userId = req.params.id;
    let user = await UserDoc.findOne({ _id: userId });
    let toSend = await Promise.all(user.requests.map(getDetails));
    res.send(toSend);
})
router.post("/requests", async (req, res) => {
    let user = await UserDoc.findOne({ _id: req.body.currentUserId });
    let fromEmail = user.email;
    let toUser = await UserDoc.findOne({ email: req.body.to });
    let userrequets = toUser.requests;
    userrequets = [...userrequets, { email: fromEmail }];
    await UserDoc.findOneAndUpdate({ email: toUser.email },
        { $set: { requests: userrequets } });
    res.send();
});
router.post("/acceptRequets", async (req, res) => {
    let user = await UserDoc.findOne({ _id: req.body.currentUserId });
    let requests = user.requests;
    requests = requests.filter((userReq) => {
        if (userReq.email == req.body.toAccept) {
            return false
        } else {
            return true
        }
    });
    let userFriends = user.friends;
    userFriends = [...userFriends, { email: req.body.toAccept }];
    await UserDoc.findOneAndUpdate({ email: user.email },
        { $set: { requests: requests, friends: userFriends } });
    let senderAccount = await UserDoc.findOne({ email: req.body.toAccept });
    let senderFriends = senderAccount.friends;
    senderFriends = [...senderFriends, { email: user.email }];
    await UserDoc.findOneAndUpdate({ email: req.body.toAccept },
        { $set: { friends: senderFriends } });
    res.send();
})
router.get("/findUsers/:keywords", async (req, res) => {
    let keywords = req.params.keywords;
    let regex = new RegExp(keywords, "i");
    let suggestedAccounts = await UserDoc.find({ email: regex });
    let suggestions = suggestedAccounts.map((account) => {
        return {
            dp: account.profilePic,
            name: account.name,
            email: account.email
        }
    });
    res.send(suggestions);
})
router.get("/testing", (req, res) => {
    res.render("testing");
})

router.get("/logout", (req, res) => {
    res.render("logout");
})



// -- pages --
// get login *
// post login *
// get register *
// post register *
// get  user
// get home *

router.get("/login", (req, res) => {
    res.render("login", {
        display: "none"
    });
})
router.get("/register", (req, res) => {
    res.render("register", {
        display: "none",
        errMsg: ""
    });
})
router.post("/login", login, save);
router.post("/register", register, save);
router.get("/user/:email", (req, res) => {
    res.render("getUser", {
        email: req.params.email
    })
})
router.post("/user/:email", someUser);
router.get("/", (req, res) => {
    res.render("get");
})
router.post("/", home);

module.exports = router;