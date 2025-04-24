import Route from '@ioc:Adonis/Core/Route'
import BusinessController from 'App/Controllers/BusinessController'

export const SiteRoutes = () => [
  Route.group(() => {
    Route.post('register_business', async (ctx) => { return new BusinessController().publicStore(ctx) })
  }).prefix('site')
]
