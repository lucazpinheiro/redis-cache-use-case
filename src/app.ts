import express from 'express'
import * as mongo from './lib/mongo'

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

export async function start() {
  console.log(PORT, MONGO_URI)
  try {
    await mongo.connect(MONGO_URI)
    app.listen(PORT, () => {
      console.log(`server is up on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}