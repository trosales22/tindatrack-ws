import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { column, BaseModel, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import GeneralConstants from 'App/Constants/GeneralConstants'

export default class Feedback extends BaseModel {
  @column({
    isPrimary: true,
    serializeAs: 'id',
    columnName: 'id',
    consume: (value, attribute, model) => {
      return value || model.$getAttribute(attribute)
    },
  })
  public id: number

  @column({ serializeAs: 'uuid', columnName: 'uuid' })
  public uuid: string

  @column({ serializeAs: 'name', columnName: 'name' })
  public name: string

  @column({ serializeAs: 'email', columnName: 'email' })
  public email: string

  @column({ serializeAs: 'message', columnName: 'message' })
  public message: string

  @column.dateTime({
    serializeAs: 'created_at',
    columnName: 'created_at',
    autoCreate: true,
    serialize: (value: DateTime | null) => {
      return value ? value.setZone(GeneralConstants.PH_TIMEZONE).toISO() : value
    },
  })
  public createdAt: DateTime

  @column.dateTime({
    serializeAs: 'updated_at',
    columnName: 'updated_at',
    serialize: (value: DateTime | null) => {
      return value ? value.setZone(GeneralConstants.PH_TIMEZONE).toISO() : value
    },
  })
  public updatedAt: DateTime

  @beforeCreate()
  public static setId(user: Feedback) {
    user.uuid = uuidv4()
  }
}
