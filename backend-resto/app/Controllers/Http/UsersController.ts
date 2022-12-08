import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'
import RegisterRestaurateurValidator from 'App/Validators/RegisterRestaurateurValidator'
import LoginUserValidator from 'App/Validators/LoginUserValidator'
import LoginRestaurateurValidator from 'App/Validators/LoginRestaurateurValidator'
import Role from 'App/Models/Role'
import User from 'App/Models/User'



export default class UsersController {
  // public async index({}: HttpContextContract) {}

  // public async create({}: HttpContextContract) {}

  public async login({ request, response }: HttpContextContract) {
    const loginUserPayload = await request.validate(LoginUserValidator)

  }

  public async register({ request, response }: HttpContextContract) {
    const registerUserPayload = await request.validate(RegisterUserValidator)

  }

  public async loginRestaurateur({ request, response }: HttpContextContract) {
    const loginRestaurateurPayload = await request.validate(LoginRestaurateurValidator)

  }

  public async registerRestaurateur({ request, response }: HttpContextContract) {
    const registerRestaurateurPayload = await request.validate(RegisterRestaurateurValidator)

    const role = await Role.find(registerRestaurateurPayload.role_id)

    if (!role) {
      return response.status(404).send({
        message: "role introuvable pour l'id envoyé"
      })
    }

    const user = new User()
    user.numero_de_telephone = registerRestaurateurPayload.numero_de_telephone
    user.imei_du_telephone = registerRestaurateurPayload.imei_du_telephone
    user.indicatif_telephonique = registerRestaurateurPayload.indicatif_telephonique
    // user.role().associate(role)
    // await user.related('role').save(role)
    // await user.save()

  }


  // public async show({}: HttpContextContract) {}

  // public async edit({}: HttpContextContract) {}

  // public async update({}: HttpContextContract) {}

  // public async destroy({}: HttpContextContract) {}
}
