import CreateException from "App/Exceptions/CreateException"
import UpdateException from "App/Exceptions/UpdateException"
import BusinessInventory from "App/Models/BusinessInventory"

export default class ProductInventoryRepository {
  constructor() {}

  async add(data){
    return await BusinessInventory.create(data).then(
      (created) => {
        return created.serialize()
      },
      (err) => {
        throw new CreateException('inventory', err.message)
      }
    )
  }

  async update(uuid: string, dataToBeAdded) {
    return await BusinessInventory.query().update(dataToBeAdded).where('uuid', uuid).then(
      (response) => {
        return response
      },
      (error) => {
        throw new UpdateException('inventory', error.message)
      }
    )
  }

  async updateOrCreate(source, attributes){
    return await BusinessInventory.updateOrCreate(source, attributes).then(
      (created) => {
        return {
          is_new: created.$isNew,
          data: created.serialize()
        };
      },
      (err) => {
        throw new CreateException('inventory', err.message)
      }
    )
  }
}
