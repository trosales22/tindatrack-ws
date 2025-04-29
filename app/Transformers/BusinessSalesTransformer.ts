import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import GeneralConstants from 'App/Constants/GeneralConstants'
import DateFormatterHelper from 'App/Helpers/DateFormatterHelper'

export default class BusinessSalesTransformer extends TransformerAbstract {
  public async transform(model: any) {
    const business = model.business
    const product = model.product
    let businessArr: any = null
    let productArr: any = null

    if(business){
      businessArr = {
        id: business.uuid,
        name: business.name,
        type: business.type
      }
    }

    if(product){
      const productCategory = product.category
      productArr = {
        id: product.uuid,
        name: product.name,
        category: {
          code: productCategory,
          label: GeneralConstants.PRODUCT_CATEGORY_LABELS[productCategory] ?? productCategory
        },
      }
    }

    return {
      id: model.uuid,
      product: productArr,
      cost_price: model.cost_price,
      quantity: model.quantity,
      total_amount: model.total_amount,
      customer_name: model.customer_name,
      remarks: model.remarks,
      business: businessArr,
      created_at: DateFormatterHelper.formatDate(model.created_at),
      updated_at: DateFormatterHelper.formatDate(model.updated_at)
    }
  }
}
