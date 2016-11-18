const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListItem = Schema({
	_id: { type: String },
	content: { type: String, match: /^[\w?\W?]{1,50}/, required: true }
});

module.exports = ListItem;