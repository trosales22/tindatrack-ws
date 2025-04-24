import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import DateFormatterHelper from 'App/Helpers/DateFormatterHelper'

export default class BusinessTransformer extends TransformerAbstract {
  public async transform(model: any) {
    const owner = model.owner
    let ownerArr: any = null

    if(owner){
      ownerArr = {
        id: owner.uuid,
        email: owner.email,
        mobile: owner.mobile,
        firstname: owner.firstname,
        lastname: owner.lastname,
        photo_url: owner.photo_url
      }
    }

    return {
      id: model.uuid,
      owner: ownerArr,
      name: model.name,
      slug: model.slug,
      description: model.description,
      location: model.location,
      photo_url: model.photo_url,
      created_at: DateFormatterHelper.formatDate(model.created_at),
      updated_at: DateFormatterHelper.formatDate(model.updated_at)
    }
  }
}
