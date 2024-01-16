const Router = require('express')
const typeController = require('../controllers/typeController')
const router = new Router()
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware("ADMIN"), typeController.create)
router.delete('/:id', checkRoleMiddleware("ADMIN"), typeController.delete)
router.patch('/:id', checkRoleMiddleware("ADMIN"), typeController.update)
router.get('/', typeController.getAll)

module.exports = router