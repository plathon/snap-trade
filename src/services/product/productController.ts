import { NextFunction, Request, Response } from 'express'
import ProductService from './productService'

export default class ProductController {
  constructor(private productService: ProductService) {}

  createProduct = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const body = request.body
    try {
      const result = await this.productService.createProduct(body)
      response.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  listProducts = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.productService.listProduct()
      response.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}
