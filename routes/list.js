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
	res.render('list/create_edit', { title: 'New List', listItems: [], listTitle: '', listId: '' });
});

router.get('/edit/:id', (req, res, next) => {
	const listId = req.params.id;
	Promise.resolve()
	.then(() => model.findOne({ _id: listId }))
	.then(list => {
		res.render('list/create_edit', { title: list.title, listItems: list.items, listTitle: list.title, listId: list._id });
	})
	.catch(err => next(err));
});

router.post('/api/delete', (req, res, next) => {
	const id = req.body.id;
	Promise.resolve()
	.then(() => model.remove({ _id: id }))
	.catch(err => next(err));
});

router.post('/api/save', (req, res, next) => {
	const list = JSON.parse(req.body.list);
	if(list._id !== '') {
		const query = { _id: list._id };
		Promise.resolve()
		.then(() => model.findOneAndUpdate(query, { title: list.title, items: list.items }))
		.then(res.send('Save Success'))
		.catch(err => next(err));
	} else {
		const newId = mongoose.Types.ObjectId().toString();
		const newList = new model({ _id: newId, title: list.title, items: list.items });
		Promise.resolve()
		.then(() => newList.save(err => {
			if (err)
				console.log(err);
		}))
		.then(res.send({ status: 'Save Success', id: newId }))
		.catch(err => next(err));
	}
});

module.exports = router;
