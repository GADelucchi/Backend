function auth(req, res, next) {
    if (req.session?.user?.username !== `GADelucchi`) {
        return res.status(401).send(`Authentication error`)
    }
    next()
}

module.exports = { auth }