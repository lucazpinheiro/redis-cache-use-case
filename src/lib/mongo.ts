
import mongoose, { Schema, model } from 'mongoose'
import { Product } from '../types'

interface IProduct {
  id: string;
  name: string;
}

const productSchema = new Schema<IProduct>({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const ProductModel = model<IProduct>('api', productSchema)

async function connect (uri: string) {
  await mongoose.connect(uri)
}

async function getProducts (): Promise<IProduct[]> {
  const products = await ProductModel.find()
  return products.map(({ name, id }) => ({ name, id }))
}

async function createProduct (p: Product) {
  const product = new ProductModel(p)
  await product.save()
}

export {
  connect,
  getProducts,
  createProduct
}
