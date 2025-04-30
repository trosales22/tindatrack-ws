import Route from '@ioc:Adonis/Core/Route'
import DashboardController from 'App/Controllers/DashboardController'

export const DashboardRoutes = () => [
  Route.group(() => {
    Route.group(() => {
      Route.get('totals', async (ctx) => { return new DashboardController().statistics(ctx)})
    }).prefix('statistics')

    Route.group(() => {
      Route.get('sales_stats', async (ctx) => { return new DashboardController().salesStats(ctx)})
      Route.get('product_count_per_business', async (ctx) => { return new DashboardController().productCountPerBusiness(ctx)})
      Route.get('product_category_count_per_business', async (ctx) => { return new DashboardController().productCategoryCountPerBusiness(ctx)})
    }).prefix('analytics')
  }).prefix('dashboard').middleware(['auth:api'])
]
