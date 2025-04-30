import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import GeneralConstants from 'App/Constants/GeneralConstants'
import Business from './Business'
import BusinessProduct from './BusinessProduct'

export default class BusinessSales extends BaseModel {
  public static table = 'business_sales'

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
    serializeAs: 'cost_price',
    columnName: 'cost_price',
    consume: (value: string) => Number(value)
  })
  public costPrice: number;

  @column({
    serializeAs: 'quantity',
    columnName: 'quantity',
    consume: (value: string) => Number(value)
  })
  public quantity: number;

  @column({
    serializeAs: 'total_amount',
    columnName: 'total_amount',
    consume: (value: string) => Number(value)
  })
  public totalAmount: number;

  @column({ serializeAs: 'customer_name', columnName: 'customer_name' })
  public customer_name: string;

  @column({ serializeAs: 'remarks', columnName: 'remarks' })
  public remarks: string;

  @column({ serializeAs: 'owner_id', columnName: 'owner_id' })
  public ownerId: string;

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
  public static setId(businessSales: BusinessSales) {
    businessSales.uuid = uuidv4()
  }

  @belongsTo(() => Business, {
    localKey: 'uuid',
    foreignKey: 'businessId'
  })
  public business: BelongsTo<typeof Business>

  @belongsTo(() => BusinessProduct, {
      localKey: 'uuid',
      foreignKey: 'productId'
    })
    public product: BelongsTo<typeof BusinessProduct>
}
