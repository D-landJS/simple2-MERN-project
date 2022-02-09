import app from './app';
// import './database';

// Middlewares

const port = app.get('port');

app.listen(port, () => {
	console.log('Server on port', port);
});
