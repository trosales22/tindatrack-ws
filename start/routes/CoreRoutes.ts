import Route from '@ioc:Adonis/Core/Route'
import AuthController from 'App/Controllers/AuthController'
import { BusinessRoutes } from './BusinessRoutes'
import { DashboardRoutes } from './DashboardRoutes'

export const CoreRoutes = () => [
  Route.group(() => {
    Route.post('login', async (ctx) => {return new AuthController().login(ctx)})
    Route.post('logout', async (ctx) => {return new AuthController().logout(ctx)}).middleware('auth:api')
    Route.put('change_password', async (ctx) => {return new AuthController().changePassword(ctx)}).middleware('auth:api')
    Route.get('my_profile', async (ctx) => { return new AuthController().myProfile(ctx)}).middleware(['auth:api'])
    Route.put('my_profile', async (ctx) => { return new AuthController().updateProfile(ctx)}).middleware(['auth:api'])

    Route.post('business_admin/register', async (ctx) => {return new AuthController().businessAdminStore(ctx)})

    BusinessRoutes()
    DashboardRoutes()
  }).prefix('core')
]
