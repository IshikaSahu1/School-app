import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import schoolsRouter from './routes/schools.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/', schoolsRouter);

app.get('/health', (_req, res) => res.json({ ok: true, status: 'healthy' }));

export default app;
