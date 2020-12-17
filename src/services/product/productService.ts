import ProductRepository from './productRepository'
import { CreateProductRequestDTO } from './productServiceDTO'

export default class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(createProductRequestDTO: CreateProductRequestDTO) {
    const product = await this.productRepository.createProduct(
      createProductRequestDTO
    )
    return product
  }

  async listProduct() {
    const products = await this.productRepository.listProduct()
    return products
  }
}
