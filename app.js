const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimiter = require('express-limiter');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const appController = require('./controllers/appController');
const schemaController = require('./controllers/schemaController');
const mongoose = require('mongoose');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

rateLimiter(app);
rateLimiter({
	lookup: [ 'connection.remoteAddress' ],
	total: 100,
	expire: 1000 * 60 * 60
});
app.use(helmet());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

Promise.resolve()
.then(() => {
	return new Promise((resolve, reject) => {
		mongoose.Promise = Promise;
		mongoose.connect('mongodb://localhost/CS3630');
		const database = mongoose.connection;
		database.on('error', (...args) => {
			console.error('connection error: ', ...args);
			reject('Connection to database could not be opened.');
		});
		database.once('open', () => {
			resolve();
		});
	});
})
.then(() => schemaController(app))
.then(() => appController(app))
.then(() => {
	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// error handlers

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
		app.use((err, req, res, next) => {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err
			});
		});
	}

	// production error handler
	// no stacktraces leaked to user
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
})
.catch(err => {
	console.error(err);
	process.exit(1);
});

module.exports = app;