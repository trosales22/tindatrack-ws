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
import RegisterBusinessWithOwnerRequest from 'App/Validators/Business/RegisterBusinessWithOwnerRequest'

export default class BusinessController {
  private businessRepo: BusinessRepository
  private userRepo: UserRepository

  constructor() {
    this.businessRepo = new BusinessRepository()
    this.userRepo = new UserRepository()
  }

  // @ts-ignore
  public async index({ auth, request, response, transform }: HttpContextContract) {
    const userAuthData = auth.use('api').user!

    const list = await this.businessRepo.getAll({
      q: request.input('q', null),
      owner_id: userAuthData?.uuid,
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
  public async store({ auth, request, response, transform }: HttpContextContract) {
    await request.validate(CreateBusinessRequest)

    const userAuthData = auth.use('api').user!
    let payload = request.only(['name', 'type', 'status'])
    payload['owner_id'] = userAuthData?.uuid

    const createdBusiness = await this.businessRepo.add(payload)
    const businessId = createdBusiness.uuid

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

    let payload = request.only(['name', 'type', 'status'])
    payload['updated_at'] = currentTimestamp
    await this.businessRepo.update(businessId, payload)

    const data = await this.businessRepo.getById(businessId)
    const transformed = await transform.item(data, BusinessTransformer)
    const serialized = JSONSerializerHelper.serialize(Business.table, null, transformed)

    return response.json(serialized)
  }

  public async destroy({ params, request, response }: HttpContextContract) {
    await request.validate(DeleteBusinessRequest)

    const businessId = params.id
    await this.businessRepo.delete(businessId)

    return response.status(204).json(null)
  }

  // @ts-ignore
  public async publicStore({ request, response, transform }: HttpContextContract) {
    await request.validate(RegisterBusinessWithOwnerRequest)

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
