import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import GeneralConstants from 'App/Constants/GeneralConstants'
import Business from './Business'

export default class BusinessInventory extends BaseModel {
  public static table = 'business_inventories'

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
  public uuid: string;

  @column({ serializeAs: 'business_id', columnName: 'business_id' })
  public businessId: string;

  @column({ serializeAs: 'product_id', columnName: 'product_id' })
  public productId: string;

  @column({
    serializeAs: 'stock',
    columnName: 'stock',
    consume: (value: string) => Number(value)
  })
  public stock: number;

  @column({ serializeAs: 'remarks', columnName: 'remarks' })
  public remarks: string;

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
  public static setId(businessInventory: BusinessInventory) {
    businessInventory.uuid = uuidv4()
  }

  @belongsTo(() => Business, {
    localKey: 'uuid',
    foreignKey: 'businessId'
  })
  public business: BelongsTo<typeof Business>
}
