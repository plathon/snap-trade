import ProductRepository from './productRepository'
import ProductService from './productService'
import ProductController from './productController'

const productRepository = new ProductRepository()
const productService = new ProductService(productRepository)
const productController = new ProductController(productService)

export default productController
