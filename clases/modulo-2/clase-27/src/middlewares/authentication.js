function auth(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(401).send(`Authentication error`)
    }
    next()
}

module.exports = { auth }