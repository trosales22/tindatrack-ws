import Route from '@ioc:Adonis/Core/Route'
import BusinessController from 'App/Controllers/BusinessController'
import FeedbackController from 'App/Controllers/FeedbackController'

export const SiteRoutes = () => [
  Route.group(() => {
    Route.post('register_business', async (ctx) => { return new BusinessController().publicStore(ctx) })
    Route.post('submit_feedback', async (ctx) => { return new FeedbackController().store(ctx) })
  }).prefix('site')
]
