import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Business from 'App/Models/Business'
import GeneralConstants from 'App/Constants/GeneralConstants'

export default class RegisterBusinessWithOwnerRequest {
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
    ] as const),
    email: schema.string({ trim: true, escape: true }, [
      rules.email(),
      rules.maxLength(50)
    ]),
    firstname: schema.string({ trim: true, escape: true }, [
      rules.maxLength(50)
    ]),
    lastname: schema.string({ trim: true, escape: true }, [
      rules.maxLength(50)
    ]),
    password: schema.string({ trim: true, escape: true }, [
      rules.minLength(8),
      rules.maxLength(16)
    ])
  })

  public messages = {
    'name.required': 'Business Name is required',
    'name.unique': 'Business Name already exist',
    'type.required': 'Type is required',
    'type.enum': 'Type must be in {{ options.choices }}',
    'description.maxLength': 'Description max length is 500',
    'location.maxLength': 'Location max length is 200',
    'photo_url.maxLength': 'Photo URL max length is 500',
    'email.required': 'Email is required',
    'email.email': 'Email must be a valid format',
    'email.maxLength': 'Email max length is 50',
    'mobile.maxLength': 'Mobile Number max length is 50',
    'firstname.required': 'Firstname is required',
    'firstname.maxLength': 'Firstname max length is 50',
    'lastname.required': 'Lastname is required',
    'lastname.maxLength': 'Lastname max length is 50',
    'password.required': 'Password is required',
    'password.minLength': 'Password must be atleast 8 characters',
    'password.maxLength': 'Password max length is 16'
  }
}
