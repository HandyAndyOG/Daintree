import express from 'express';
import { Response, Application } from 'express';
import request from 'request'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
require('dotenv').config();

const app: Application = express();
const bp = require('body-parser')
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

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

const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) { 
    return res.status(401).send('No valid token')
  }
  if (typeof accessTokenSecret === 'string') {
    jwt.verify(token, accessTokenSecret, (err: any, user: any) => {
      if (err) {
        return res.status(403).send('No Access')
      } 
      req.user = user
      next()
    })
  }
}

app.get('/api/user', authenticateToken, (req: any, res) => {
  const options = {
    url: `http://localhost:8000/api/user/${req.user.id}`,
    method: 'GET',
    json: true,
  };
  request(options, (error, body: any) => {
    if(error) {
      return res.status(500).send(error);
    }
      return res.status(200).send({user: body.body.data.email, id: body.body.data.id, role: body.body.data.role, uniqueStoreId: body.body.data.uniqueStoreId, status: 'success' })
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
            if(error) {
              return res.status(500).send(error);
            }
            try{
              if(await bcrypt.compare(loginPass, body.body.data.password)) {
                if (typeof accessTokenSecret === 'string') {
                  const userDetails = {id: body.body.data.id, user: req.body.email, role: body.body.data.role}
                  const accessToken = jwt.sign(userDetails, accessTokenSecret)
                  return res.status(200).send({ status:'Login Successful', accessToken: accessToken })
                }
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

app.get('/api/product', authenticateToken, (_, res) => {
  const options = {
    url:'http://localhost:8000/api/product',
    method: 'GET',
    json: true
  }
  request(options, (error, body: any) => {
    if(error) {
      return res.status(500).send(error);
    }
    return res.status(200).send(body)
  })
})

app.get('/api/store/:id',authenticateToken, (req: any, res) => {
  const uniqueStoreId = req.params.id
  const options = {
    url:`http://localhost:8000/api/store/${uniqueStoreId}`,
    method: 'GET',
    json: true
  }
  request(options, (error, body: any) => {
    if(error) {
      return res.status(500).send(error);
    }
    return res.status(200).send({store: body.body.data, status: body.body.message})
  })
})

app.get('/api/store/:id/product',authenticateToken, (req: any, res) => {
  const uniqueStoreId = req.params.id
  const options = {
    url:`http://localhost:8000/api/store/${uniqueStoreId}/product`,
    method: 'GET',
    json: true
  }
  request(options, (error, body: any) => {
    if(error) {
      return res.status(500).send(error);
    }
    return res.status(200).send(body.body.data)
  })
})

app.post('/api/store/:id/product',authenticateToken, (req: any, res) => {
  const uniqueStoreId = req.params.id
  const options = {
    url:`http://localhost:8000/api/product/${uniqueStoreId}`,
    method: 'POST',
    json: true,
    body: {
      title: req.body.title,
      quantity: req.body.quantity,
      price: req.body.price,
      category: req.body.category
    }
  }
  request(options, (error, body: any) => {
    if(error) {
      return res.status(500).send(error);
    }
    return res.status(200).send(body.body)
  })
})

app.patch('/api/product/:id', authenticateToken, (req, res) => {
  const productID = req.params.id
  const options = {
    url:`http://localhost:8000/api/product/${productID}`,
    method: 'PATCH',
    json: true,
    body: {
      quantity: req.body.quantity
    }
  }
  request(options, (error, body: any) => {
    if(error) {
      return res.status(500).send(error);
    }
    return res.status(200).send(body.body)
  })
})

app.delete('/api/product/:id',authenticateToken, (req: any, res) => {
  const productID = req.params.id
  const options = {
    url:`http://localhost:8000/api/product/${productID}`,
    method: 'DELETE',
    json: true,
  }
  request(options, (error, body: any) => {
    if(error) {
      return res.status(500).send(error);
    }
    return res.status(200).send(body.body)
  })
})

app.get('/api/store', (_, res) => {
  const options = {
    url: `http://localhost:8000/api/store`,
    method: 'GET',
    json: true
  }
  request(options, (error, body: any) => {
    if (error) {
      return res.status(500).send(error)
    }
    return res.status(200).send(body.body)
  })
})

app.post('/api/store', (req, res) => {
  const options = {
    url: `http://localhost:8000/api/store`,
    method: 'POST',
    json: true,
    body: { title: req.body.title, adminId: req.body.adminId }
  }
  request(options, (error, body: any) => {
    if (error) {
      return res.status(500).send(error)
    }
    return res.status(200).send(body.body)
  })
})

app.delete('/api/store/:id', (req, res) => {
  const uniqueStoreId = req.params.id
  console.log(uniqueStoreId)
  const options = {
    url: `http://localhost:8000/api/store/${uniqueStoreId}`,
    method: 'DELETE',
    json: true,
  }
  request(options, (error, body: any) => {
    if (error) {
      return res.status(500).send(error)
    }
    return res.status(200).send(body.body)
  })
})



export default app

// app.post('/api/token', (req, res) => {
//   const refreshToken = req.body.token
//   if(!refreshToken) return res.status(401).send('No token')
//   if(!refreshToken.includes(refreshToken)) return res.status(403).send('No token')
//   if (typeof accessTokenSecret === 'string') {
//     jwt.verify(refreshToken, accessTokenSecret, (err: any, user: any) => {
//       if(err) return res.sendStatus(403)
//       console.log(user)
//       const accessToken = generateAccessToken({email: user.email, refreshToken: user.refreshToken})
//       return res.json({ accessToken: accessToken })
//     })
    
//   }
//   return
// })