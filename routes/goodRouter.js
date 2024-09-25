const Router = require('express');
const router = new Router();
const goodController = require('../controllers/goodController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('admin'), goodController.create);
router.get('/', goodController.getAll);
router.get('/:id', goodController.getOne);

module.exports = router;