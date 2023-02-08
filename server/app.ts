import express from 'express';
import { Response, Application } from 'express';
import request from 'request'
import cors from 'cors'
// import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

require('dotenv').config();

const app: Application = express();
const bp = require('body-parser')

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(function(_, res: Response, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true")
  next();
});

app.get('/api/user', (_, res) => {
  const options = {
    url: 'http://localhost:8000/api/user',
    method: 'GET',
    json: true,
  };
  request(options, (error, body: any) => {
    if(error) {
      return res.status(500).send(error);
    }
      return res.status(200).send(body)
    }
  )
  })

app.post('/api/user/register', async (req, res) => {
  const hashedPass = await bcrypt.hash(req.body.password, 10)
  const options = {
    url: 'http://localhost:8000/api/user',
    method: 'POST',
    json: true,
    body: {
      email: req.body.email,
      password: hashedPass,
      role: req.body.role
    }
  };

  request(options, (error, body) => {
    if(error) {
      return res.status(500).send(error);
    }
    return res.status(200).send(body)
  })
})

app.post('/api/user/login/', async (req, res) => {
  const loginPass = req.body.password
  try {
    const options = {
      url: 'http://localhost:8000/api/user',
      method: 'GET',
      json: true,
    };
    request(options, (error, body: any) => {
      if(error) {
        return res.status(500).send(error);
      }
      const user = body.body.data.find((user: any) => user.email === req.body.email)
      if (!user) {
        return res.status(400).send("Cannot find user")
      }
      const options = {
            url: `http://localhost:8000/api/user/${user.id}`,
            method: 'GET',
            json: true,
          }
          request(options, async (error, body: any) => {
            console.log(body.body.data)
            if(error) {
              return res.status(500).send(error);
            }
            try{
              if(await bcrypt.compare(loginPass, body.body.data.password)) {
                return res.status(200).send('Login Successful')
              }
              return res.status(400).send('Invalid password')
            } catch (err) {
              return res.status(500).send(err)
            }
          })
      return
    })
  } catch (err) {
    console.log(err)
  }
})

export default app