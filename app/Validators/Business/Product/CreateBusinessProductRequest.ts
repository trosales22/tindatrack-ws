import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GeneralConstants from 'App/Constants/GeneralConstants'
import BusinessProduct from 'App/Models/BusinessProduct'

export default class CreateBusinessProductRequest {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true, escape: true }, [
      rules.unique({table: BusinessProduct.table, column: 'name', caseInsensitive: true})
    ]),
    category: schema.enum([
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
    unit_price: schema.number(),
    cost_price: schema.number(),
    status: schema.enum([
      GeneralConstants.GENERAL_STATUS_TYPES.ACTIVE,
      GeneralConstants.GENERAL_STATUS_TYPES.INACTIVE
    ] as const),
  })

  public messages = {
    'name.required': 'Product Name is required',
    'name.unique': 'Product Name already exist',
    'category.required': 'Category is required',
    'category.enum': 'Category must be in {{ options.choices }}',
    'unit_price.required': 'Unit Price is required',
    'unit.price.number': 'Unit Price must be a number',
    'cost_price.required': 'Cost Price is required',
    'cost_price.price.number': 'Cost Price must be a number',
    'status.required': 'Status is required',
    'status.enum': 'Status must be in {{ options.choices }}'
  }
}
