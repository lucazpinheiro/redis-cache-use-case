import express from 'express'
import * as mongo from './lib/mongo'
import * as cache from './lib/cache'

const PORT = Number(process.env?.PORT) || 3000
const MONGO_URI = String(process.env?.MONGO_URI)

const app = express()

app.use(express.json())
app.use((req, res, next) => {
  console.log(`${req.method.toUpperCase()} - ${req.path}`)
  next()
})

app.get('/status', (req, res) => {
  res.status(200).json({
    msg: 'up and running'
  })
})
app.get('/products', async (req, res) => {
  try {
    const products = await mongo.getProducts()
    res.status(200).json({
      products
    })
  } catch (err) {
    res.status(500).json({
      msg: 'something went wrong',
      error: JSON.stringify(err)
    })
  }
})
app.post('/products', async (req, res) => {
  try {
    const { id, name } = req.body
    await mongo.createProduct({
      id, name
    })
    res.status(201).json()
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: 'something went wrong',
      error: JSON.stringify(err)
    })
  }
})

export async function start () {
  try {
    await Promise.all([mongo.connect(MONGO_URI), cache.connect()])
    app.listen(PORT, () => {
      console.log(`server is up on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
