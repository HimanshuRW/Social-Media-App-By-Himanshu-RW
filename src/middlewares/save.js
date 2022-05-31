async function save(req,res) {
    res.render("save",{
        id: res.locals.userId
    });
}

module.exports = save;