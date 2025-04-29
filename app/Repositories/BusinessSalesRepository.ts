import CreateException from "App/Exceptions/CreateException";
import NotFoundException from "App/Exceptions/NotFoundException";
import DeleteException from "App/Exceptions/DeleteException";
import UpdateException from "App/Exceptions/UpdateException";
import BusinessSales from "App/Models/BusinessSales";

export default class BusinessSalesRepository {
  constructor() {}

  async add(data){
    return await BusinessSales.create(data).then(
      (created) => {
        return created.serialize()
      },
      (err) => {
        throw new CreateException('business sales', err.message)
      }
    )
  }

  async addMany(data: any){
    return await BusinessSales.createMany(data).then(
      (created) => {
        return created
      },
      (err) => {
        throw new CreateException('business sales', err.message)
      }
    )
  }

  async update(uuid: string, dataToBeAdded) {
    return await BusinessSales.query().update(dataToBeAdded).where('uuid', uuid).then(
      (response) => {
        return response
      },
      (error) => {
        throw new UpdateException('business sales', error.message)
      }
    )
  }

  async getAll(filters: any) {
    let {
      q,
      business_id: businessId,
      sort_by: sortBy = 'id',
      sort_direction: sortDirection = 'desc',
    } = filters

    let queryModel = BusinessSales.query()
      .preload('business').preload('product')

    if(q){
      queryModel
        .where('customer_name', 'LIKE', `%${q}%`)
        .orWhere('remakrs', 'LIKE', `%${q}%`)
    }

    if(businessId){
      queryModel.where('business_id', businessId)
    }

    return await queryModel
      .orderBy(sortBy, sortDirection)
      .paginate(filters.page, filters.limit)
  }

  async getById(uuid: string) {
    return BusinessSales.query().preload('business').preload('product')
      .where('uuid', uuid)
      .firstOrFail()
      .then((res) => {
        return res.serialize()
      }, (err) => {
        throw new NotFoundException('business sales', err.message)
      }
    )
  }

  async delete(uuid: string) {
    return await BusinessSales.query().delete().where('uuid', uuid).then(
      (deleted) => {
        return deleted
      },
      (err) => {
        throw new DeleteException('business sales', err.message)
      }
    )
  }
}
