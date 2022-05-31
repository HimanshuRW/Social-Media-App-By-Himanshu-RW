const UserDoc = require("../models/user");

async function someUser(req,res) {
    try {
        let anotherUserEmail = req.params.email;
        let currentUser= await UserDoc.findOne({_id:req.body.currentUserId});
        let anotherUser= await UserDoc.findOne({email:anotherUserEmail});
        let friendsArray = currentUser.friends;
        let isFriend=false;
        friendsArray.forEach(friend => {
            if (friend.email==anotherUserEmail) {
                isFriend=true;
            }
        });
        if (isFriend) {
            res.render("friend",{
                userDp: anotherUser.profilePic,
                userName: anotherUser.name,
                id:anotherUser._id
            })
        } else {
            res.render("someone",{
                userEmail:anotherUser.email,
                userDp:anotherUser.profilePic,
                userName: anotherUser.name
            })
        }
    } catch (error) {
        console.log("someone catch block - > ",error);
    }
}

module.exports = someUser;