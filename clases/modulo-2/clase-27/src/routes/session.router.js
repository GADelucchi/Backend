// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)
const passport = require('passport')

// Imports rutas ––––––––––––––––––––––––––––––––––––––––––––
const { auth } = require('../middlewares/authentication.js')
const { passportCall } = require('../passport-jwt/passportCall.js')
const { authorization } = require('../passport-jwt/authorizationJwtRole.js')
const sessionController = require('../controllers/sessions.controller.js')

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.get('/current', passportCall('jwt'), authorization('Admin'), sessionController.getCurrent)

router.post(`/login`, sessionController.postLogin)

router.get(`/private`, auth, sessionController.getPrivate)

router.post(`/register`, sessionController.postRegister)

router.post(`/restorepass`, sessionController.postRestorePass)

router.get(`/logout`, sessionController.getLogout)

router.get(`/counter`, sessionController.getCounter)

router.get(`/github`, passport.authenticate(`github`, { scope: [`user:email`] }))

router.get(`/githubcallback`, passport.authenticate(`github`, { failureRedirect: `http://localhost:8080` }), sessionController.getGithubCallback)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router 