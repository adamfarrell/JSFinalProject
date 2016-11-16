const fs = require('fs');

module.exports = function(app) {
	return new Promise((resolve, reject) => {
		fs.readdir('./routes', (err, files) => {
			if(err)
				return reject(err);

			for (let i = 0; i < files.length; i++) {
				const controllerName = files[i].substr(0, files[i].lastIndexOf('.'));

				if(controllerName === 'index')
					app.use('/', require(`../routes/${controllerName}`));
				app.use(`/${controllerName}`, require(`../routes/${controllerName}`));
			}
			resolve(app);
		});
	});
};