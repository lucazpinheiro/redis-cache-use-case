
import mongoose, { Schema, model } from 'mongoose'
import { Product } from '../types'

const productSchema = new Schema<Product>({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const ProductModel = model<Product>('api', productSchema)

async function connect (uri: string) {
  await mongoose.connect(uri)
}

async function getProducts (): Promise<Product[]> {
  const products = await ProductModel.find()
  return products.map(({ name, id }) => ({ name, id }))
}

function timeConsumingTask () {
  setTimeout(() => {}, 500)
}

async function createProduct (p: Product) {
  timeConsumingTask()
  const product = new ProductModel(p)
  await product.save()
}

export {
  connect,
  getProducts,
  createProduct
}
