import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JSONSerializerHelper from 'App/Helpers/JSONSerializerHelper'
import DateFormatterHelper from 'App/Helpers/DateFormatterHelper'
import BusinessProductRepository from 'App/Repositories/BusinessProductRepository'
import BusinessProduct from 'App/Models/BusinessProduct'
import BusinessProductTransformer from 'App/Transformers/BusinessProductTransformer'
import ViewBusinessProductRequest from 'App/Validators/Business/Product/ViewBusinessProductRequest'
import CreateBusinessProductRequest from 'App/Validators/Business/Product/CreateBusinessProductRequest'
import UpdateBusinessProductRequest from 'App/Validators/Business/Product/UpdateBusinessProductRequest'
import DeleteBusinessProductRequest from 'App/Validators/Business/Product/DeleteBusinessProductRequest'
import ListBusinessProductRequest from 'App/Validators/Business/Product/ListBusinessProductRequest'

export default class BusinessProductController {
  private businessProductRepo: BusinessProductRepository

  constructor() {
    this.businessProductRepo = new BusinessProductRepository()
  }

  // @ts-ignore
  public async index({ auth, params, request, response, transform }: HttpContextContract) {
    await request.validate(ListBusinessProductRequest)

    const list = await this.businessProductRepo.getAll({
      q: request.input('q', null),
      business_id: params.id,
      page: request.input('page', 1),
      limit: request.input('limit', 25)
    })

    const serializedList = list.serialize()
    const transformed = await transform.collection(serializedList.data, BusinessProductTransformer)
    const serialized = JSONSerializerHelper.serialize(BusinessProduct.table, serializedList.meta, transformed)

    return response.json(serialized)
  }

  // @ts-ignore
  public async show({ params, request, response, transform }: HttpContextContract) {
    await request.validate(ViewBusinessProductRequest)

    const data = await this.businessProductRepo.getById(params.product_id)
    const transformed = await transform.item(data, BusinessProductTransformer)
    const serialized = JSONSerializerHelper.serialize(BusinessProduct.table, null, transformed)

    return response.json(serialized)
  }

  // @ts-ignore
  public async store({ auth, params, request, response, transform }: HttpContextContract) {
    await request.validate(CreateBusinessProductRequest)

    let payload = request.only(['name', 'category', 'unit_price', 'cost_price', 'status'])
    payload['business_id'] = params.id

    const created = await this.businessProductRepo.add(payload)
    const productId = created.uuid

    const data = await this.businessProductRepo.getById(productId)
    const transformed = await transform.item(data, BusinessProductTransformer)
    const serialized = JSONSerializerHelper.serialize(BusinessProduct.table, null, transformed)

    return response.created(serialized)
  }

  // @ts-ignore
  public async update({ params, request, response, transform }: HttpContextContract) {
    await request.validate(UpdateBusinessProductRequest)

    const productId = params.product_id
    const currentTimestamp = DateFormatterHelper.getCurrentTimestamp()

    let payload = request.only(['name', 'category', 'unit_price', 'cost_price', 'status'])
    payload['updated_at'] = currentTimestamp
    await this.businessProductRepo.update(productId, payload)

    const data = await this.businessProductRepo.getById(productId)
    const transformed = await transform.item(data, BusinessProductTransformer)
    const serialized = JSONSerializerHelper.serialize(BusinessProduct.table, null, transformed)

    return response.json(serialized)
  }

  public async destroy({ params, request, response }: HttpContextContract) {
    await request.validate(DeleteBusinessProductRequest)

    const productId = params.product_id
    await this.businessProductRepo.delete(productId)

    return response.status(204).json(null)
  }
}
