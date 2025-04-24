import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Business from 'App/Models/Business'

export default class CreateBusinessRequest {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true, escape: true }, [
      rules.unique({table: Business.table, column: 'name', caseInsensitive: true})
    ]),
    description: schema.string.optional({ trim: true, escape: true }, [
      rules.maxLength(500)
    ]),
    location: schema.string.optional({ trim: true, escape: true }, [
      rules.maxLength(200)
    ]),
    photo_url: schema.string.optional({ trim: true, escape: true }, [
      rules.maxLength(500)
    ]),
    email: schema.string({ trim: true, escape: true }, [
      rules.email(),
      rules.maxLength(50)
    ]),
    mobile: schema.string.optional({ trim: true, escape: true }, [
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
