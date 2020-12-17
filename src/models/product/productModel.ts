import { model } from 'mongoose'
import { ProductDocument } from './productTypes'
import ProductSchema from './productSchema'

export const ProductModel = model<ProductDocument>('product', ProductSchema)
