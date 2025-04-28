import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import GeneralConstants from 'App/Constants/GeneralConstants'
import Business from './Business'
import BusinessInventory from './BusinessInventory'

export default class BusinessProduct extends BaseModel {
  public static table = 'business_products'

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

  @column({ serializeAs: 'name', columnName: 'name' })
  public name: string;

  @column({ serializeAs: 'category', columnName: 'category' })
  public category: string;

  @column({
    serializeAs: 'unit_price',
    columnName: 'unit_price',
    consume: (value: string) => Number(value)
  })
  public unitPrice: number;

  @column({
    serializeAs: 'cost_price',
    columnName: 'cost_price',
    consume: (value: string) => Number(value)
  })
  public costPrice: number;

  @column({ serializeAs: 'status', columnName: 'status' })
  public status: string;

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
  public static setId(businessProduct: BusinessProduct) {
    businessProduct.uuid = uuidv4()
  }

  @belongsTo(() => Business, {
    localKey: 'uuid',
    foreignKey: 'businessId'
  })
  public business: BelongsTo<typeof Business>

  @hasOne(() => BusinessInventory, {
    localKey: 'uuid',
    foreignKey: 'productId'
  })
  public inventory: HasOne<typeof BusinessInventory>
}
