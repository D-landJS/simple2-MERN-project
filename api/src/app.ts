import express from 'express';
import config from './config';
import morgan from 'morgan';
import cors from 'cors';
import videoRoutes from './routes/videos.routes';

//cors -> Permite que cualquier servidor puede hacer peticiones a este
const app = express();

app.set('port', config.PORT);

// Cualquier servidor podra hacer operaciones
app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/videos', videoRoutes);

export default app;
