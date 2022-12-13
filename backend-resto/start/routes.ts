/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.get('/', async () => {
  return { hello: 'world' }
})

Route
  .group(() => {
    Route
      .group(() => {
        Route.get('/', 'RolesController.index')
      })
      .prefix('/roles')

    Route
      .group(() => {
        Route.post('/login', 'UsersController.login')

        Route.post('/register', 'UsersController.register')
          .middleware(['auth', 'requireAdminUser'])

        Route.post('/login-restaurateur', 'UsersController.loginRestaurateur')

        Route.post('/register-restaurateur', 'UsersController.registerRestaurateur')

        Route.post('/restaurateur-complete-registration', 'UsersController.restaurateurCompleteRegistration')
          .middleware(['auth'])

        Route.post('/verify-otp-code', 'UsersController.verifyOtpCode')

        Route.get('/logout', 'UsersController.logout')
          .middleware('auth')

        Route.get('/:id/validate', 'UsersController.validateUser')
          .middleware(['auth', 'requireAdminUser'])

        Route.post('/:id/change-role', 'UsersController.changeUserRole')
          .middleware(['auth', 'requireAdminUser'])
      })
      .prefix('/users')
  })
  .prefix('/api')


