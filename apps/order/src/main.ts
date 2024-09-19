import app from './app';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
