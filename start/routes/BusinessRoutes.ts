import Route from '@ioc:Adonis/Core/Route'
import BusinessController from 'App/Controllers/BusinessController'
import BusinessProductController from 'App/Controllers/BusinessProductController'
import ProductInventoryController from 'App/Controllers/ProductInventoryController'

export const BusinessRoutes = () => {
  Route.group(() => {
    Route.get('/', async (ctx) => { return new BusinessController().index(ctx) })
    Route.get('/:id', async (ctx) => { return new BusinessController().show(ctx) })
    Route.post('/', async (ctx) => { return new BusinessController().store(ctx) })
    Route.put('/:id', async (ctx) => { return new BusinessController().update(ctx) })
    Route.delete('/:id', async (ctx) => { return new BusinessController().destroy(ctx) })

    Route.group(() => {
      Route.get('/', async (ctx) => { return new BusinessProductController().index(ctx) })
      Route.get('/:product_id', async (ctx) => { return new BusinessProductController().show(ctx) })
      Route.post('/', async (ctx) => { return new BusinessProductController().store(ctx) })
      Route.put('/:product_id', async (ctx) => { return new BusinessProductController().update(ctx) })
      Route.delete('/:product_id', async (ctx) => { return new BusinessProductController().destroy(ctx) })

      Route.post('/:product_id/inventory/manage', async (ctx) => { return new ProductInventoryController().manage(ctx) })

    }).prefix('/:id/products')
  }).prefix('businesses').middleware('auth:api')
}
