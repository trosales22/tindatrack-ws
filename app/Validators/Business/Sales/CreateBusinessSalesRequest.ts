import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BusinessProduct from 'App/Models/BusinessProduct'
import Business from 'App/Models/Business'

export default class CreateBusinessSalesRequest {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({escape: true, trim: true}, [
        rules.exists({table: Business.table, column: 'uuid'})
      ])
    }),
    sales: schema.array.optional().members(
      schema.object().members({
        product_id: schema.string({escape: true, trim: true}, [
          rules.exists({
            table: BusinessProduct.table,
            column: 'uuid'
          })
        ]),
        quantity: schema.number(),
        customer_name: schema.string.optional({escape: true, trim: true}),
        remarks: schema.string.optional({escape: true, trim: true})
      })
    )
  })

  public messages = {
    'params.id.required': 'Business ID is required',
    'params.id.exists': 'Business ID does not exist',
    'sales.*.product_id.required': 'Product ID is required',
    'sales.*.product_id.exists': 'Product ID does not exist',
    'sales.*.quantity.required': 'Quantity is required',
    'sales.*.quantity.price.number': 'Quantity must be a number',
  }
}
