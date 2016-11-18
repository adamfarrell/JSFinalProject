const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const model = mongoose.model('list');

router.get('/', (req, res, next) => {
	Promise.resolve()
	.then(() => model.find({ }))
	.then(list => {
		res.render('list/index', { title: 'Your Lists', list });
	})
	.catch(err => next(err));
});

router.get('/index', (req, res, next) => {
	Promise.resolve()
	.then(() => model.find({ }))
	.then(list => {
		res.render('list/index', { title: 'Your Lists', list });
	})
	.catch(err => next(err));
});

router.get('/create', (req, res, next) => {
	res.render('list/create_edit', { title: 'New List' });
});

router.get('/edit/:id', (req, res, next) => {
	const listId = req.params.id;
	Promise.resolve()
	.then(() => model.findOne({ _id: listId }))
	.then(list => {
		res.render('list/create_edit', { title: list.title, list, listName: list.title });
	})
	.catch(err => next(err));
});

router.post('/api/delete', (req, res, next) => {
	console.log('trying to delete');
	const id = req.body.id;
	Promise.resolve()
	.then(() => model.remove({ _id: id }))
	.catch(err => next(err));
});

module.exports = router;
