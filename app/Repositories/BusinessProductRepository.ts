import CreateException from "App/Exceptions/CreateException";
import NotFoundException from "App/Exceptions/NotFoundException";
import DeleteException from "App/Exceptions/DeleteException";
import UpdateException from "App/Exceptions/UpdateException";
import BusinessProduct from "App/Models/BusinessProduct";

export default class BusinessProductRepository {
  constructor() {}

  async add(data){
    return await BusinessProduct.create(data).then(
      (created) => {
        return created.serialize()
      },
      (err) => {
        throw new CreateException('business product', err.message)
      }
    )
  }

  async update(uuid: string, dataToBeAdded) {
    return await BusinessProduct.query().update(dataToBeAdded).where('uuid', uuid).then(
      (response) => {
        return response
      },
      (error) => {
        throw new UpdateException('business product', error.message)
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

    let queryModel = BusinessProduct.query()
      .preload('business')
      .preload('inventory')

    if(q){
      queryModel.where('name', 'LIKE', '%' + q + '%')
    }

    if(businessId){
      queryModel.where('business_id', businessId)
    }

    return await queryModel
      .orderBy(sortBy, sortDirection)
      .paginate(filters.page, filters.limit)
  }

  async getById(uuid: string) {
    return BusinessProduct.query().preload('business').preload('inventory')
      .where('uuid', uuid)
      .firstOrFail()
      .then((res) => {
        return res.serialize()
      }, (err) => {
        throw new NotFoundException('business product', err.message)
      }
    )
  }

  async delete(uuid: string) {
    return await BusinessProduct.query().delete().where('uuid', uuid).then(
      (deleted) => {
        return deleted
      },
      (err) => {
        throw new DeleteException('business product', err.message)
      }
    )
  }
}
