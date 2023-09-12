const { Router } = require("express");
const { generateProduct } = require("../utils/generateProductFaker");

const router = Router()

router.get('/', (req, res) => {
    res.send(generateProduct())
})

module.exports = router 