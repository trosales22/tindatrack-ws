import {rules, schema} from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Business from 'App/Models/Business';

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
    description: schema.string.optional({ trim: true, escape: true }, [
      rules.maxLength(500)
    ]),
    location: schema.string.optional({ trim: true, escape: true }, [
      rules.maxLength(200)
    ]),
    photo_url: schema.string.optional({ trim: true, escape: true }, [
      rules.maxLength(500)
    ]),
    email: schema.string.optional({ trim: true, escape: true }, [
      rules.email(),
      rules.maxLength(50)
    ]),
    mobile: schema.string.optional({ trim: true, escape: true }, [
      rules.maxLength(50)
    ]),
    firstname: schema.string.optional({ trim: true, escape: true }, [
      rules.maxLength(50)
    ]),
    lastname: schema.string.optional({ trim: true, escape: true }, [
      rules.maxLength(50)
    ])
  })

  public messages = {
    'params.id.required': 'Business ID is required',
    'params.id.exists': 'Business ID does not exist',
    'name.required': 'Business Name is required',
    'name.unique': 'Business Name already exist',
    'description.maxLength': 'Description max length is 500',
    'location.maxLength': 'Location max length is 200',
    'photo_url.maxLength': 'Photo URL max length is 500',
    'email.email': 'Email must be a valid format',
    'email.maxLength': 'Email max length is 50',
    'mobile.maxLength': 'Mobile Number max length is 50',
    'firstname.maxLength': 'Firstname max length is 50',
    'lastname.maxLength': 'Lastname max length is 50'
  }
}
