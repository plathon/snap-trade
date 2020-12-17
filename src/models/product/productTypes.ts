import { Document } from 'mongoose'

export interface Product {
  _id?: string
  name: string
  description: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ProductDocument extends Omit<Product, '_id'>, Document {}
