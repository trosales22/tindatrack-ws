import {schema, rules} from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Business from 'App/Models/Business'

export default class ListBusinessSalesRequest {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({escape: true, trim: true}, [
        rules.exists({table: Business.table, column: 'uuid'})
      ])
    }),
    page: schema.number.optional(),
    limit: schema.number.optional()
  })

  public messages = {
    'params.id.required': 'Business ID is required',
    'params.id.exists': 'Business ID does not exist',
    'page.number': 'Page must be a number',
    'limit.number': 'Limit must be a number'
  }
}
