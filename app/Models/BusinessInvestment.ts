import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import GeneralConstants from 'App/Constants/GeneralConstants'
import Business from './Business'

export default class BusinessInvestment extends BaseModel {
  public static table = 'business_investments'

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

  @column({ serializeAs: 'type', columnName: 'type' })
  public type: string;

  @column({
    serializeAs: 'amount',
    columnName: 'amount',
    consume: (value: string) => Number(value)
  })
  public amount: number;

  @column({ serializeAs: 'source', columnName: 'source' })
  public source: string;

  @column({ serializeAs: 'description', columnName: 'description' })
  public description: string;

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
  public static setId(businessInvestment: BusinessInvestment) {
    businessInvestment.uuid = uuidv4()
  }

  @belongsTo(() => Business, {
    localKey: 'uuid',
    foreignKey: 'businessId'
  })
  public business: BelongsTo<typeof Business>
}
