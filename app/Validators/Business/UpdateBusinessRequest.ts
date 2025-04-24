import {rules, schema} from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Business from 'App/Models/Business';
import GeneralConstants from 'App/Constants/GeneralConstants';

export default class UpdateBusinessRequest {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({escape: true, trim: true}, [
        rules.exists({table: Business.table, column: 'uuid'})
      ])
    }),
    name: schema.string({ trim: true, escape: true }, [
      rules.unique({
        table: Business.table,
        column: 'name',
        whereNot: {
          uuid: this.ctx.params.id
        }
      })
    ]),
    type: schema.enum.optional([
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
    'params.id.required': 'Business ID is required',
    'params.id.exists': 'Business ID does not exist',
    'name.required': 'Business Name is required',
    'name.unique': 'Business Name already exist',
    'type.enum': 'Type must be in {{ options.choices }}',
  }
}
