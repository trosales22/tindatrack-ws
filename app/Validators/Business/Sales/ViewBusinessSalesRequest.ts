import {rules, schema} from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Business from 'App/Models/Business';
import BusinessSales from 'App/Models/BusinessSales';

export default class ViewBusinessSalesRequest {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({escape: true, trim: true}, [
        rules.exists({table: Business.table, column: 'uuid'})
      ]),
      sales_id: schema.string({escape: true, trim: true}, [
        rules.exists({
          table: BusinessSales.table,
          column: 'uuid',
          where: {
            business_id: this.ctx.params.id
          }
        })
      ])
    })
  })

  public messages = {
    'params.id.required': 'Business ID is required',
    'params.id.exists': 'Business ID does not exist',
    'params.sales_id.required': 'Sales ID is required',
    'params.sales_id.exists': 'Sales ID does not exist'
  }
}
