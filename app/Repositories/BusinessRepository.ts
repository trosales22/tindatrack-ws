import CreateException from "App/Exceptions/CreateException";
import NotFoundException from "App/Exceptions/NotFoundException";
import DeleteException from "App/Exceptions/DeleteException";
import UpdateException from "App/Exceptions/UpdateException";
import Business from "App/Models/Business";

export default class BusinessRepository {
  constructor() {}

  async add(data){
    return await Business.create(data).then(
      (created) => {
        return created.serialize()
      },
      (err) => {
        throw new CreateException('business', err.message)
      }
    )
  }

  async update(uuid: string, dataToBeAdded) {
    return await Business.query().update(dataToBeAdded).where('uuid', uuid).then(
      (response) => {
        return response
      },
      (error) => {
        throw new UpdateException('business', error.message)
      }
    )
  }

  async getAll(filters: any) {
    let {
      q,
      owner_id: ownerId,
      sort_by: sortBy = 'id',
      sort_direction: sortDirection = 'desc',
    } = filters

    let queryModel = Business.query().preload('owner')

    if(q){
      queryModel.where('name', 'LIKE', '%' + q + '%')
    }

    if(ownerId){
      queryModel.where('owner_id', ownerId)
    }

    return await queryModel
      .orderBy(sortBy, sortDirection)
      .paginate(filters.page, filters.limit)
  }

  async getById(uuid: string) {
    return Business.query().preload('owner')
      .where('uuid', uuid)
      .firstOrFail()
      .then((res) => {
        return res.serialize()
      }, (err) => {
        throw new NotFoundException('business', err.message)
      }
    )
  }

  async delete(uuid: string) {
    return await Business.query().delete().where('uuid', uuid).then(
      (deleted) => {
        return deleted
      },
      (err) => {
        throw new DeleteException('business', err.message)
      }
    )
  }

  isExistsById(uuid: string) {
    return Business.query()
      .where('uuid', uuid)
      .firstOrFail()
      .then(() => {
        return true
      }, () => {
        return false
      }
    )
  }
}
