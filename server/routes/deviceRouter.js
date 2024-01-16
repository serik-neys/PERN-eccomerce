const Router = require('express')
const deviceController = require('../controllers/deviceController')
const router = new Router()
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/',  deviceController.create)
router.patch('/:id',  deviceController.upadte)
router.delete('/:id', checkRoleMiddleware("ADMIN"), deviceController.delete)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

module.exports = router