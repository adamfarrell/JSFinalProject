const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
	res.render('list/index', { title: 'All Lists' });
});

router.get('/index', (req, res, next) => {
	res.render('list/index', { title: 'All Lists' });
});

module.exports = router;
