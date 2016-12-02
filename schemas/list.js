const mongoose = require('mongoose');
const ListItem = require('./list_item');
const Schema = mongoose.Schema;

const List = Schema({
	_id: String,
	title: { type: String, match: /^[\S][\w?\W?]{0,50}/ },
	items: [ ListItem ]
});

module.exports = List;