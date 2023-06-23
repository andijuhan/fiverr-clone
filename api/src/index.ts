import 'dotenv/config';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router';
import errorHandle from './middleware/errorHandler.middleware';
import createHttpError from 'http-errors';

const app = express();
const server = http.createServer(app);

app.use(
   cors({
      credentials: true,
      origin: ['http://localhost:3000'],
   })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api', router());
app.use((req, res, next) => {
   next(createHttpError(404, 'Enpoint not found'));
});
app.use(errorHandle);

server.listen(process.env.PORT, () => {
   console.log('Server running on port', process.env.PORT);
});
