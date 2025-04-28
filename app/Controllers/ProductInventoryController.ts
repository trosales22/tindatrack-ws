import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductInventoryRepository from 'App/Repositories/ProductInventoryRepository'
import ManageProductInventoryRequest from 'App/Validators/Business/Product/ManageProductInventoryRequest'

export default class ProductInventoryController {
  private productInventoryRepo: ProductInventoryRepository

  constructor() {
    this.productInventoryRepo = new ProductInventoryRepository()
  }

  public async manage({ params, request, response }: HttpContextContract) {
    await request.validate(ManageProductInventoryRequest)

    // const userAuthData = auth.use('api').user!
    const businessId = params.id
    const productId = params.product_id

    await this.productInventoryRepo.updateOrCreate({
      'business_id': businessId,
      'product_id': productId
    }, {
      'business_id': businessId,
      'product_id': productId,
      'stock': request.input('quantity')
    })

    return response.json({
      'message': 'Successfully updated product inventory stock.'
    })
  }
}
