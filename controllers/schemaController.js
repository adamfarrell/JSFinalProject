const fs = require('fs');
const mongoose = require('mongoose');

module.exports = function() {
	return new Promise((resolve, reject) => {
		fs.readdir('./schemas', (err, files) => {
			if(err)
				return reject(err);

			for(let i = 0; i < files.length; i++) {
				const schemaName = files[i].substr(0, files[i].lastIndexOf('.'));
				const schema = require(`../schemas/${schemaName}`);
				mongoose.model(schemaName, schema);
			}
			resolve();
		});
	});
};