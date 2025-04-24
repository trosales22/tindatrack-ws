import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import GeneralConstants from 'App/Constants/GeneralConstants'
import User from './User'
import slugify from 'slugify'

export default class Business extends BaseModel {
  public static table = 'businesses'

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

  @column({ serializeAs: 'owner_id', columnName: 'owner_id' })
  public ownerId: string

  @column({ serializeAs: 'name', columnName: 'name' })
  public name: string

  @column({ serializeAs: 'slug', columnName: 'slug' })
  public slug: string

  @column({ serializeAs: 'description', columnName: 'description' })
  public description: string

  @column({ serializeAs: 'location', columnName: 'location' })
  public location: string

  @column({ serializeAs: 'photo_url', columnName: 'photo_url' })
  public photoUrl: string

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
  public static setId(business: Business) {
    business.uuid = uuidv4()
  }

  @beforeCreate()
  public static async generateSlug(business: Business) {
    let slug = slugify(business.name, {
      lower: true
    })
    const exists = await Business.query().where('slug', slug).first()

    if (exists) {
      slug = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`
    }

    business.slug = slug
  }

  @belongsTo(() => User, {
    localKey: 'uuid',
    foreignKey: 'ownerId'
  })
  public owner: BelongsTo<typeof User>
}
