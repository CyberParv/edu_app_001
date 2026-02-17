import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { json, urlencoded } from 'express';
import morgan from 'morgan';
import { corsMiddleware } from './middleware/cors';
import { helmetMiddleware } from './middleware/helmet';
import { requestId } from './middleware/requestId';
import { sanitize } from './middleware/sanitize';
import { errorHandler } from './middleware/errorHandler';
import authRouter from './routes/auth';
import { apiLimiter } from './middleware/rateLimiter';

const app = express();

app.use(corsMiddleware);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(requestId);
app.use(morgan('dev'));
app.use(helmetMiddleware);
app.use(sanitize);

app.use('/auth', authRouter);

app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});