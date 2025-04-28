import {rules, schema} from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Business from 'App/Models/Business';
import BusinessProduct from 'App/Models/BusinessProduct';
import GeneralConstants from 'App/Constants/GeneralConstants';

export default class UpdateBusinessProductRequest {
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
    name: schema.string({ trim: true, escape: true }, [
      rules.unique({
        table: BusinessProduct.table,
        column: 'name',
        whereNot: {
          uuid: this.ctx.params.product_id
        }
      })
    ]),
    category: schema.enum.optional([
      GeneralConstants.PRODUCT_CATEGORIES.SNACKS,
      GeneralConstants.PRODUCT_CATEGORIES.BEVERAGES,
      GeneralConstants.PRODUCT_CATEGORIES.CANNED_GOODS,
      GeneralConstants.PRODUCT_CATEGORIES.INSTANT_NOODLES,
      GeneralConstants.PRODUCT_CATEGORIES.RICE_AND_GRAINS,
      GeneralConstants.PRODUCT_CATEGORIES.BREAD_AND_BAKERY,
      GeneralConstants.PRODUCT_CATEGORIES.FROZEN_GOODS,
      GeneralConstants.PRODUCT_CATEGORIES.CONDIMENTS_AND_SAUCES,
      GeneralConstants.PRODUCT_CATEGORIES.COOKING_ESSENTIALS,
      GeneralConstants.PRODUCT_CATEGORIES.PERSONAL_CARE,
      GeneralConstants.PRODUCT_CATEGORIES.CLEANING_SUPPLIES,
      GeneralConstants.PRODUCT_CATEGORIES.PET_SUPPLIES,
      GeneralConstants.PRODUCT_CATEGORIES.SARI_SARI_ESSENTIALS,
      GeneralConstants.PRODUCT_CATEGORIES.E_SERVICES,
      GeneralConstants.PRODUCT_CATEGORIES.STATIONERY,
      GeneralConstants.PRODUCT_CATEGORIES.TOYS_ACCESSORIES,
      GeneralConstants.PRODUCT_CATEGORIES.HOME_KITCHEN,
      GeneralConstants.PRODUCT_CATEGORIES.VEGETABLES,
      GeneralConstants.PRODUCT_CATEGORIES.FRUITS,
      GeneralConstants.PRODUCT_CATEGORIES.OTHERS
    ] as const),
    unit_price: schema.number.optional(),
    cost_price: schema.number.optional(),
    status: schema.enum.optional([
      GeneralConstants.GENERAL_STATUS_TYPES.ACTIVE,
      GeneralConstants.GENERAL_STATUS_TYPES.INACTIVE
    ] as const)
  })

  public messages = {
    'params.id.required': 'Business ID is required',
    'params.id.exists': 'Business ID does not exist',
    'params.product_id.required': 'Product ID is required',
    'params.product_id.exists': 'Product ID does not exist',
    'name.required': 'Product Name is required',
    'name.unique': 'Product Name already exist',
    'category.enum': 'Category must be in {{ options.choices }}',
    'unit.price.number': 'Unit Price must be a number',
    'cost_price.price.number': 'Cost Price must be a number',
    'status.enum': 'Status must be in {{ options.choices }}'
  }
}
