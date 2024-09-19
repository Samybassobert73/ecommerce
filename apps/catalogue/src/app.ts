import express from 'express';
import cors from 'cors';
import indexRouter from './routes/index.route';
import { connect } from './database/mongodb';
import { httpLogger, HandleErrorWithLogger } from './utils';
import morgan from 'morgan';
connect();
const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(httpLogger);
app.use(indexRouter);
app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.use(HandleErrorWithLogger);
// app.use((error, req, res, next) => {
//   console.error(error);
//   res.status(500).json({ message: error.message });
// });

export default app;
