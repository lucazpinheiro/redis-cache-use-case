
import { Schema, model, connect } from 'mongoose'
import { Product } from '../types'

const productSchema = new Schema<Product>({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
})

const ProductModel = model<Product>('api', productSchema, 'api')

async function connect(uri: string) {
  await connect(uri)
}

async function getProducts() {
  const products = await ProductModel.find()
  return products.map(p => {
    id: p.id
  })
}

async function createProduct(p: Product) {
  const product = new ProductModel(p)
  await product.save()
}

export {
  connect,
  getProducts,
  createProduct
}

// export default class ObjectModel implements Model {
//   private model: typeof mongoosePointModel

//   constructor (model: typeof mongoosePointModel) {
//     this.model = model
//   }

//   async getAllPoints () {
//     const mongoosePoints = await this.model.find()
//     return mongoosePoints.map(point => new Point(point.name, point.xAxis, point.yAxis))
//   }

//   async createPoint (point: Point) {
    
// await this.model.create(point)
//   }
// }
