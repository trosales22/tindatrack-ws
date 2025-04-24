import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Business from 'App/Models/Business'
import GeneralConstants from 'App/Constants/GeneralConstants'

export default class CreateBusinessRequest {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true, escape: true }, [
      rules.unique({table: Business.table, column: 'name', caseInsensitive: true})
    ]),
    type: schema.enum([
      GeneralConstants.STORE_TYPES.RETAIL,
      GeneralConstants.STORE_TYPES.FOOD_STALL,
      GeneralConstants.STORE_TYPES.EATERY,
      GeneralConstants.STORE_TYPES.GROCERY,
      GeneralConstants.STORE_TYPES.KIOSK,
      GeneralConstants.STORE_TYPES.MARKET_VENDOR,
      GeneralConstants.STORE_TYPES.OTHER
    ] as const)
  })

  public messages = {
    'name.required': 'Business Name is required',
    'name.unique': 'Business Name already exist',
    'type.required': 'Type is required',
    'type.enum': 'Type must be in {{ options.choices }}'
  }
}
