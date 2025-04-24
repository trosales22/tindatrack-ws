import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import GeneralConstants from 'App/Constants/GeneralConstants'
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

    const type = model.type
    const status = model.status

    return {
      id: model.uuid,
      name: model.name,
      type: {
        code: type,
        label: GeneralConstants.STORE_TYPE_LABELS[type] ?? type
      },
      status: {
        code: status,
        label: GeneralConstants.GENERAL_STATUS_LABELS[status] ?? status
      },
      owner: ownerArr,
      created_at: DateFormatterHelper.formatDate(model.created_at),
      updated_at: DateFormatterHelper.formatDate(model.updated_at)
    }
  }
}
