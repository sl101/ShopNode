const Router = require('express');
const router = new Router();
const goodController = require('../controllers/goodController');

router.post('/', goodController.create);
router.get('/', goodController.getAll);
router.get('/:id', goodController.getOne);

module.exports = router;