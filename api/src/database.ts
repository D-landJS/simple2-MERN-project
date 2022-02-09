import mongoose from 'mongoose';
import config from './config';

(async () => {
	try {
		const db = await mongoose.connect(`mongodb://${config.HOST}/${config.DB}`);
		console.log('Database is connect', db.connection.name);
	} catch (e) {
		console.error(e);
	}
})();
