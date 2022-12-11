import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class RequireAdminUser {
  public async handle({ auth, request, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    // await next()

    if (auth.use('api').isLoggedIn) {
      const userRole = await Role.findOrFail(auth.user?.roleId)

      if (userRole?.name !== 'Administrateur') {
        return response.unauthorized({ error: "Opération uniquement réservé à l'administrateur" })
      }
    }

    return await next()
  }
}
