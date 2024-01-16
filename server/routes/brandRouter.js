const Router = require('express')
const brandController = require('../controllers/brandController')
const router = new Router()
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware("ADMIN"), brandController.create)
router.delete('/:id', checkRoleMiddleware("ADMIN"), brandController.delete)
router.patch('/:id', checkRoleMiddleware("ADMIN"), brandController.update)
router.get('/', brandController.getAll)

module.exports = router