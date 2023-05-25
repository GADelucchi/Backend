function auth(req, res, next) {
    if (req.session.user !== `GADelucchi` || !req.session.admin) {
        return res.status(401).send(`Authentication error`)
    }
    next()
}

module.exports = { auth }