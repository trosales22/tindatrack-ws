import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class RegisterBusinessAdminRequest {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstname: schema.string({ trim: true, escape: true }, [
      rules.maxLength(50)
    ]),
    lastname: schema.string({ trim: true, escape: true }, [
      rules.maxLength(50)
    ]),
    email: schema.string({ trim: true, escape: true }, [
      rules.unique({table: User.table, column: 'email'}),
      rules.email(),
      rules.maxLength(50)
    ]),
    username: schema.string({ trim: true, escape: true }, [
      rules.unique({table: User.table, column: 'username', caseInsensitive: true})
    ]),
    password: schema.string({ trim: true, escape: true }, [
      rules.minLength(8),
      rules.maxLength(16)
    ])
  })

  public messages = {
    'firstname.required': 'Firstname is required',
    'firstname.maxLength': 'Firstname max length is 50',
    'lastname.required': 'Lastname is required',
    'lastname.maxLength': 'Lastname max length is 50',
    'email.required': 'Email is required',
    'email.unique': 'Email already exist',
    'email.email': 'Email must be a valid format',
    'email.maxLength': 'Email max length is 50',
    'username.required': 'Username is required',
    'username.unique': 'Username already exist',
    'password.required': 'Password is required',
    'password.minLength': 'Password must be atleast 8 characters',
    'password.maxLength': 'Password max length is 16'
  }
}
