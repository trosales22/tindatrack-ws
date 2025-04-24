import Route from '@ioc:Adonis/Core/Route'
import BusinessController from 'App/Controllers/BusinessController'

export const BusinessRoutes = () => {
  Route.group(() => {
    Route.get('/', async (ctx) => { return new BusinessController().index(ctx) })
    Route.get('/:id', async (ctx) => { return new BusinessController().show(ctx) })
    Route.post('/', async (ctx) => { return new BusinessController().store(ctx) })
    Route.put('/:id', async (ctx) => { return new BusinessController().update(ctx) })
    Route.delete('/:id', async (ctx) => { return new BusinessController().destroy(ctx) })
  }).prefix('businesses').middleware('auth:api')
}
