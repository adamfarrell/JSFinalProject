const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListItem = Schema({
	// _id: String,
	content: { type: String, match: /^[\S][\w?\W?]{0,50}/, required: true }
}, { _id: false });

module.exports = ListItem;