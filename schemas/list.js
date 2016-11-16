const mongoose = require('mongoose');
const ListItem = require('./list_item');
const Schema = mongoose.Schema;

const List = Schema({
	title: { type: String, match: /^[\w?\W?]{1,50}/ },
	items: [ ListItem ]
});

module.exports = List;