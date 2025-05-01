import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateFeedbackRequest {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true, escape: true }, [
      rules.maxLength(50)
    ]),
    email: schema.string({ trim: true, escape: true }),
    message: schema.string({ trim: true, escape: true }, [
      rules.maxLength(200)
    ])
  })

  public messages = {
    'name.required': 'Name is required',
    'name.maxLength': 'Name max length is 50',
    'email.required': 'Email is required',
    'message.required': 'Message is required',
    'message.maxLength': 'Message max length is 200',
  }
}
