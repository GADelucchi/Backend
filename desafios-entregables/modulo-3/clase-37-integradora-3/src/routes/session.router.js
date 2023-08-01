// Imports externos –––––––––––––––––––––––––––––––––––––––––
const { Router } = require(`express`)
const passport = require('passport')
const sessionController = require('../controllers/sessions.controller.js')
const { authToken, authTokenRestorePass } = require('../utils/jwt.js')

// Declaración ––––––––––––––––––––––––––––––––––––––––––––––
const router = Router()

// Configuración ––––––––––––––––––––––––––––––––––––––––––––
router.post(`/login`, sessionController.postLogin)

router.get(`/private`, authToken, sessionController.getPrivate)

router.post(`/register`, sessionController.postRegister)

router.get(`/initrestorepass`, sessionController.initRestorePass)

router.post(`/sendmail`, sessionController.sendMail)

router.get(`/getrestorepass/:token`, authTokenRestorePass, sessionController.getRestorePass)

router.post(`/postrestorepass`, sessionController.postRestorePass)

router.get(`/logout`, sessionController.getLogout)

router.get(`/github`, passport.authenticate(`github`, { scope: [`user:email`] }))

router.get(`/githubcallback`, passport.authenticate(`github`, { failureRedirect: `http://localhost:8080` }), sessionController.getGithubCallback)

// Export –––––––––––––––––––––––––––––––––––––––––––––––––––
module.exports = router 