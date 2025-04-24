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
    const q = filters.q
    const sort = filters.sort ?? null

    let queryModel = Business.query().preload('owner')

    if(sort){
      const [key, direction]: any = Object.entries(sort)[0];
      queryModel.orderBy(key, direction)
    }else{
      queryModel.orderBy('id', 'desc')
    }

    if(q){
      queryModel
        .where('name', 'LIKE', '%' + q + '%')
    }

    return await queryModel.paginate(filters.page, filters.limit)
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

  async getBySlug(slug: string) {
    return Business.query().preload('owner')
      .where('slug', slug)
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
