import dotenv from 'dotenv';
dotenv.config();

export default {
	PORT: process.env.PORT || 2000,
	DB: process.env.DB || 'videosdb',
	USER: process.env.USER || 'admin',
	PASSWORD: process.env.PASSWORD || 'admin',
	HOST: process.env.HPST || 'localhost',
};
