import { CreateProductRequestDTO } from './productServiceDTO'
import { ProductModel } from 'models/product/productModel'

export default class ProductRepository {
  async createProduct(createProductRequestDTO: CreateProductRequestDTO) {
    const product = new ProductModel(createProductRequestDTO)
    try {
      const result = await product.save()
      return result
    } catch (error) {
      throw new Error(error)
    }
  }

  async listProduct() {
    try {
      const result = await ProductModel.find().exec()
      return result
    } catch (error) {
      throw new Error(error)
    }
  }
}
