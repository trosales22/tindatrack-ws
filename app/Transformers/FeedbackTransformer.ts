import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import DateFormatterHelper from 'App/Helpers/DateFormatterHelper'

export default class FeedbackTransformer extends TransformerAbstract {
  public async transform(model: any) {
    return {
      id: model.uuid,
      name: model.name,
      email: model.email,
      message: model.message,
      created_at: DateFormatterHelper.formatDate(model.created_at),
      updated_at: DateFormatterHelper.formatDate(model.updated_at)
    }
  }
}
