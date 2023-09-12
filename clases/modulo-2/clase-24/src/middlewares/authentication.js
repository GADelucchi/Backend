function auth(req, res, next) {
    if (req.session?.user?.admin !== true) {
        return res.status(401).send(`Authentication error`)
    }
    next()
}

module.exports = { auth }