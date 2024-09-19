import express from 'express';
import cors from 'cors';
import app from './app';
import { connect } from './database/mongodb';
import { logger } from './utils';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, host, () => {
  logger.info(`[ ready ] http://${host}:${port}`);
});
