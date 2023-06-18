const authorization = role => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send({
            status: 'Error',
            error: 'Unauthorized'
        })
        console.log(req.user)
        if (req.user.role != role) return res.status(403).send({
            status: 'Error',
            error: 'No permition',
        })
        next()
    }
}

module.exports = {
    authorization
}