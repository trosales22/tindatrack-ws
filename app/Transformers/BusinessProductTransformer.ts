import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import GeneralConstants from 'App/Constants/GeneralConstants'
import DateFormatterHelper from 'App/Helpers/DateFormatterHelper'

export default class BusinessProductTransformer extends TransformerAbstract {
  public async transform(model: any) {
    const business = model.business
    const inventory = model.inventory
    let businessArr: any = null
    let inventoryArr: any = null

    if(business){
      businessArr = {
        id: business.uuid,
        name: business.name,
        type: business.type
      }
    }

    if(inventory){
      inventoryArr = {
        stock: inventory.stock || 0,
        created_at: DateFormatterHelper.formatDate(inventory.created_at),
        updated_at: DateFormatterHelper.formatDate(inventory.updated_at)
      }
    }

    const category = model.category
    const status = model.status

    return {
      id: model.uuid,
      name: model.name,
      category: {
        code: category,
        label: GeneralConstants.PRODUCT_CATEGORY_LABELS[category] ?? category
      },
      unit_price: model.unit_price,
      cost_price: model.cost_price,
      status: {
        code: status,
        label: GeneralConstants.GENERAL_STATUS_LABELS[status] ?? status
      },
      business: businessArr,
      inventory: inventoryArr,
      created_at: DateFormatterHelper.formatDate(model.created_at),
      updated_at: DateFormatterHelper.formatDate(model.updated_at)
    }
  }
}
