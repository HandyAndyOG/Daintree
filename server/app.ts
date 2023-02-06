import express from 'express';
import { Response, Application } from 'express';
require('dotenv').config();

const app: Application = express();
const bp = require('body-parser')

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(function(_, res: Response, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true")
  next();
});

app.get('/api', (_, res: Response) => {
  res.status(200).send('Server Running')
})

export default app