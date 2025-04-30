import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JSONSerializerHelper from 'App/Helpers/JSONSerializerHelper'
import DateFormatterHelper from 'App/Helpers/DateFormatterHelper'
import BusinessSalesRepository from 'App/Repositories/BusinessSalesRepository'
import BusinessSalesTransformer from 'App/Transformers/BusinessSalesTransformer'
import BusinessSales from 'App/Models/BusinessSales'
import ListBusinessSalesRequest from 'App/Validators/Business/Sales/ListBusinessSalesRequest'
import ViewBusinessSalesRequest from 'App/Validators/Business/Sales/ViewBusinessSalesRequest'
import CreateBusinessSalesRequest from 'App/Validators/Business/Sales/CreateBusinessSalesRequest'
import UpdateBusinessSalesRequest from 'App/Validators/Business/Sales/UpdateBusinessSalesRequest'
import BusinessProduct from 'App/Models/BusinessProduct'
import ProductInventoryRepository from 'App/Repositories/ProductInventoryRepository'

export default class BusinessSalesController {
  private businessSalesRepo: BusinessSalesRepository
  private productInventoryRepo: ProductInventoryRepository

  constructor() {
    this.businessSalesRepo = new BusinessSalesRepository()
    this.productInventoryRepo = new ProductInventoryRepository()
  }

  // @ts-ignore
  public async index({ params, request, response, transform }: HttpContextContract) {
    await request.validate(ListBusinessSalesRequest)

    const list = await this.businessSalesRepo.getAll({
      q: request.input('q', null),
      business_id: params.id,
      page: request.input('page', 1),
      limit: request.input('limit', 25)
    })

    const serializedList = list.serialize()
    const transformed = await transform.collection(serializedList.data, BusinessSalesTransformer)
    const serialized = JSONSerializerHelper.serialize(BusinessSales.table, serializedList.meta, transformed)

    return response.json(serialized)
  }

  // @ts-ignore
  public async show({ params, request, response, transform }: HttpContextContract) {
    await request.validate(ViewBusinessSalesRequest)

    const data = await this.businessSalesRepo.getById(params.sales_id)
    const transformed = await transform.item(data, BusinessSalesTransformer)
    const serialized = JSONSerializerHelper.serialize(BusinessSales.table, null, transformed)

    return response.json(serialized)
  }

  public async store({ auth, params, request, response }: HttpContextContract) {
    await request.validate(CreateBusinessSalesRequest)

    const userAuthData = auth.use('api').user!
    const businessUuid = params.id
    const sales = request.input('sales') ?? []
    const productIds = sales.map(s => s.product_id)
    const products = await BusinessProduct.query().whereIn('uuid', productIds).preload('inventory')
    const productMap = products.reduce((acc, product) => {
      acc[product.uuid] = product
      return acc
    }, {} as Record<string, BusinessProduct>)

    const payload: any = []

    for (const sale of sales) {
      const productId: string = sale.product_id
      const product: BusinessProduct | null = productMap[productId]

      if (!product) {
        return response.badRequest({
          code: 400,
          message: `Product not found for sale entry. Please check your inputs.`
        })
      }

      const productRemainingStock: number = product?.inventory?.stock || 0
      const quantity: number = sale?.quantity || 0

      if (productRemainingStock < quantity) {
        return response.badRequest({
          code: 400,
          message: `Not enough stock for "${product.name}". Remaining: ${productRemainingStock}, Requested: ${quantity}.`
        })
      }

      const costPrice: number = product?.costPrice || 0.0

      payload.push({
        business_id: businessUuid,
        product_id: sale.product_id,
        quantity,
        cost_price: costPrice,
        total_amount: costPrice * quantity,
        customer_name: sale.customer_name ?? null,
        remarks: sale.remarks ?? null,
        owner_id: userAuthData.uuid
      })

      await this.productInventoryRepo.decrementByProductId(productId, quantity)
    }

    await this.businessSalesRepo.addMany(payload)

    return response.created({
      message: 'Sales successfully recorded'
    })
  }

  // @ts-ignore
  public async update({ params, request, response, transform }: HttpContextContract) {
    await request.validate(UpdateBusinessSalesRequest)

    const salesId = params.sales_id
    const currentTimestamp = DateFormatterHelper.getCurrentTimestamp()

    let payload = request.only(['customer_name', 'remarks'])
    payload['updated_at'] = currentTimestamp
    await this.businessSalesRepo.update(salesId, payload)

    const data = await this.businessSalesRepo.getById(salesId)
    const transformed = await transform.item(data, BusinessSalesTransformer)
    const serialized = JSONSerializerHelper.serialize(BusinessSales.table, null, transformed)

    return response.json(serialized)
  }
}
