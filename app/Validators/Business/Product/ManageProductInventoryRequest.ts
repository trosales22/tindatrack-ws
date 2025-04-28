import {rules, schema} from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Business from 'App/Models/Business';
import BusinessProduct from 'App/Models/BusinessProduct';

export default class ManageProductInventoryRequest {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({escape: true, trim: true}, [
        rules.exists({table: Business.table, column: 'uuid'})
      ]),
      product_id: schema.string({escape: true, trim: true}, [
        rules.exists({
          table: BusinessProduct.table,
          column: 'uuid',
          where: {
            business_id: this.ctx.params.id
          }
        })
      ])
    }),
    quantity: schema.number()
  })

  public messages = {
    'params.id.required': 'Business ID is required',
    'params.id.exists': 'Business ID does not exist',
    'params.product_id.required': 'Product ID is required',
    'params.product_id.exists': 'Product ID does not exist',
    'quantity.required': 'Quantity is required',
    'quantity.number': 'Quantity must be a number'
  }
}
