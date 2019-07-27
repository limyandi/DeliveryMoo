export function isAdmin(req, res, next) {
    const authorizationHeader = req.headers.authorization

    if (authorizationHeader) {
        const token = req.headers.authorization.split(' ')[1]

        if (token === process.env.ADMIN_TOKEN) {
            next()
        } else {
            res.status(401).send({
                success: false,
                message: 'Unauthorized'
            })
        }
    } else {
        res.status(401).send({
            success: false,
            message: 'Unauthorized'
        })
    }
}
