import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GeneralConstants from 'App/Constants/GeneralConstants'
import DateFormatterHelper from 'App/Helpers/DateFormatterHelper'
import AnalyticsRepository from 'App/Repositories/AnalyticsRepository'
import StatisticsRepository from 'App/Repositories/StatisticsRepository'

export default class DashboardController {
  private statisticsRepo: StatisticsRepository
  private analyticsRepo: AnalyticsRepository

  constructor() {
    this.statisticsRepo = new StatisticsRepository()
    this. analyticsRepo = new AnalyticsRepository()
  }

  public async statistics({ auth, request, response}: HttpContextContract){
    const userAuthData = auth.use('api').user!

    const statistics = await this.statisticsRepo.getStats({
      business_id: request.input('business_id', null),
      owner_id: userAuthData.uuid
    })
    return response.json(statistics[0][0])
  }

  public async salesStats({ auth, request, response }: HttpContextContract) {
    const userAuthData = auth.use('api').user!

    const payload = {
      owner_id: userAuthData.uuid,
      business_id: request.input('business_id', null),
      year: request.input('year', DateFormatterHelper.getCurrentYear()),
      month: request.input('month'),
      group_by: request.input('group_by', 'monthly')
    }

    const analyticsRes = await this.analyticsRepo.getSalesStats(payload)

    let formattedAnalyticsRes = analyticsRes.map((item: any) => {
      let periodLabel = ''

      if (payload.group_by === 'monthly') {
        periodLabel = GeneralConstants.MONTH_NAMES[item.period]
      } else {
        const monthName = GeneralConstants.MONTH_NAMES[item.month]
        periodLabel = `${monthName} ${item.day}`
      }

      return {
        period: periodLabel,
        total_transactions: item?.total_transactions || 0,
        total_sales: item?.total_sales || 0,
        avg_sales_per_transaction: item?.avg_sales_per_transaction || 0
      }
    })

    return response.json({ data: formattedAnalyticsRes })
  }

  public async productCountPerBusiness({request, response}: HttpContextContract){
    const analyticsRes = await this.analyticsRepo.getProductCountPerBusiness({
      'business_id': request.input('business_id', null)
    })

    let formattedAnalyticsRes = analyticsRes.map((dataItem: any) => {
      return {
        'key': dataItem?.business_name || 'Business',
        'value': dataItem?.product_count || 0
      }
    })

    return response.json({
      'data': formattedAnalyticsRes
    })
  }

  public async productCategoryCountPerBusiness({request, response}: HttpContextContract){
    const analyticsRes = await this.analyticsRepo.getProductCategoryCountPerBusiness({
      'business_id': request.input('business_id', null)
    })

    let formattedAnalyticsRes = analyticsRes.map((dataItem: any) => {
      const categoryCode = dataItem?.category_code || 'Unknown'

      return {
        'key': GeneralConstants.PRODUCT_CATEGORY_LABELS[categoryCode] || categoryCode,
        'value': dataItem?.category_count || 0
      }
    })

    return response.json({
      'data': formattedAnalyticsRes
    })
  }
}
