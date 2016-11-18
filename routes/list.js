const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ListModel = mongoose.model('list');

router.get('/', (req, res, next) => {
	Promise.resolve()
	.then(() => ListModel.find({ }))
	.then(list => {
		res.render('list/index', { title: 'Your Lists', list });
	})
	.catch(err => next(err));
});

router.get('/index', (req, res, next) => {
	Promise.resolve()
	.then(() => ListModel.find({ }))
	.then(list => {
		res.render('list/index', { title: 'Your Lists', list });
	})
	.catch(err => next(err));
});

module.exports = router;
