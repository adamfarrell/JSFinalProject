var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
	res.render('index', { title: 'ListMaster 4000' });
});

router.get('/index', (req, res, next) => {
	res.render('index', { title: 'ListMaster 4000' });
});

module.exports = router;
