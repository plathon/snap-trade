import { Schema } from 'mongoose'
import { ProductDocument } from './productTypes'

const productSchema = new Schema<ProductDocument>({
  name: String,
  description: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  }
})

export default productSchema
