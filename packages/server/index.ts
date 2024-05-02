import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import express, { Request, Response } from 'express';
// import { createClientAndConnect } from './db';

const app = express();
app.use(cors());
app.use('/api/server', async (_req: Request, res: Response) => {
  res.status(200).send('ok');
});
const port = Number(process.env.SERVER_PORT) || 3001;

// createClientAndConnect();

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)');
});

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
