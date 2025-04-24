import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JSONSerializerHelper from 'App/Helpers/JSONSerializerHelper'
import DateFormatterHelper from 'App/Helpers/DateFormatterHelper'
import BusinessRepository from 'App/Repositories/BusinessRepository'
import Business from 'App/Models/Business'
import BusinessTransformer from 'App/Transformers/BusinessTransformer'
import CreateBusinessRequest from 'App/Validators/Business/CreateBusinessRequest'
import ViewBusinessRequest from 'App/Validators/Business/ViewBusinessRequest'
import UpdateBusinessRequest from 'App/Validators/Business/UpdateBusinessRequest'
import DeleteBusinessRequest from 'App/Validators/Business/DeleteBusinessRequest'
import UserRepository from 'App/Repositories/UserRepository'
import GeneralConstants from 'App/Constants/GeneralConstants'

export default class BusinessController {
  private businessRepo: BusinessRepository
  private userRepo: UserRepository

  constructor() {
    this.businessRepo = new BusinessRepository()
    this.userRepo = new UserRepository()
  }

  // @ts-ignore
  public async index({ request, response, transform }: HttpContextContract) {
    const list = await this.businessRepo.getAll({
      q: request.input('q', null),
      page: request.input('page', 1),
      limit: request.input('limit', 25)
    })

    const serializedList = list.serialize()
    const transformed = await transform.collection(serializedList.data, BusinessTransformer)
    const serialized = JSONSerializerHelper.serialize(Business.table, serializedList.meta, transformed)

    return response.json(serialized)
  }

  // @ts-ignore
  public async show({ params, request, response, transform }: HttpContextContract) {
    await request.validate(ViewBusinessRequest)

    const data = await this.businessRepo.getById(params.id)
    const transformed = await transform.item(data, BusinessTransformer)
    const serialized = JSONSerializerHelper.serialize(Business.table, null, transformed)

    return response.json(serialized)
  }

  // @ts-ignore
  public async store({ request, response, transform }: HttpContextContract) {
    await request.validate(CreateBusinessRequest)

    let businessPayload = request.only([
      'name', 'description', 'location', 'photo_url'
    ])

    let userPayload = request.only(['email', 'firstname', 'lastname', 'mobile', 'password'])
    userPayload['profile_type'] = GeneralConstants.ROLE_TYPES.BUSINESS_ADMIN
    userPayload['status'] = GeneralConstants.GENERAL_STATUS_TYPES.ACTIVE

    const createdUser = await this.userRepo.add(userPayload)
    const userId = createdUser.uuid

    businessPayload['owner_id'] = userId

    const createdBusiness = await this.businessRepo.add(businessPayload)
    const businessId = createdBusiness.uuid

    await this.userRepo.update(userId, {
      'business_id': businessId,
      'updated_at': DateFormatterHelper.getCurrentTimestamp()
    })

    const data = await this.businessRepo.getById(businessId)
    const transformed = await transform.item(data, BusinessTransformer)
    const serialized = JSONSerializerHelper.serialize(Business.table, null, transformed)

    return response.created(serialized)
  }

  // @ts-ignore
  public async update({ params, request, response, transform }: HttpContextContract) {
    await request.validate(UpdateBusinessRequest)

    const businessId = params.id
    const currentTimestamp = DateFormatterHelper.getCurrentTimestamp()

    let businessPayload = request.only([
      'name', 'description', 'location', 'photo_url'
    ])

    let userPayload = request.only(['email', 'firstname', 'lastname', 'mobile'])
    userPayload['updated_at'] = currentTimestamp

    businessPayload['updated_at'] = currentTimestamp
    await this.businessRepo.update(businessId, businessPayload)

    const data = await this.businessRepo.getById(businessId)

    await this.userRepo.update(data.owner_id, userPayload)
    const transformed = await transform.item(data, BusinessTransformer)
    const serialized = JSONSerializerHelper.serialize(Business.table, null, transformed)

    return response.json(serialized)
  }

  public async destroy({ params, request, response }: HttpContextContract) {
    await request.validate(DeleteBusinessRequest)

    const businessId = params.id
    const isExists: boolean = await this.userRepo.isExistsByBusinessId(businessId)

    if(!isExists){
      return response.badRequest({
        code: 400,
        message: 'Unable to delete business due to attached business admin(s).'
      })
    }

    await this.userRepo.updateByBusinessId(businessId, {
      'business_id': null
    })
    await this.businessRepo.delete(businessId)

    return response.status(204).json(null)
  }

  // @ts-ignore
  public async publicStore({ request, response, transform }: HttpContextContract) {
    await request.validate(CreateBusinessRequest)

    let businessPayload = request.only(['name', 'type'])
    let userPayload = request.only(['firstname', 'lastname', 'email', 'password'])
    userPayload['profile_type'] = GeneralConstants.ROLE_TYPES.BUSINESS_ADMIN
    userPayload['status'] = GeneralConstants.GENERAL_STATUS_TYPES.ACTIVE

    const createdUser = await this.userRepo.add(userPayload)
    const userId = createdUser.uuid

    businessPayload['owner_id'] = userId

    const createdBusiness = await this.businessRepo.add(businessPayload)
    const businessId = createdBusiness.uuid

    const data = await this.businessRepo.getById(businessId)
    const transformed = await transform.item(data, BusinessTransformer)
    const serialized = JSONSerializerHelper.serialize(Business.table, null, transformed)

    return response.created(serialized)
  }
}
