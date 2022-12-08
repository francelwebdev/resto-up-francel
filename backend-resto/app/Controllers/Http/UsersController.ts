import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'
import RegisterRestaurateurValidator from 'App/Validators/RegisterRestaurateurValidator'
import LoginUserValidator from 'App/Validators/LoginUserValidator'
import LoginRestaurateurValidator from 'App/Validators/LoginRestaurateurValidator'


export default class UsersController {
  // public async index({}: HttpContextContract) {}

  // public async create({}: HttpContextContract) {}

  public async login({request, response}: HttpContextContract) {
    const loginUserPayload = await request.validate(LoginUserValidator)

  }

  public async register({request, response}: HttpContextContract) {
    const registerUserPayload = await request.validate(RegisterUserValidator)

  }

  public async loginRestaurateur({request, response}: HttpContextContract) {
    const loginRestaurateurPayload = await request.validate(LoginRestaurateurValidator)

  }

  public async registerRestaurateur({request, response}: HttpContextContract) {
    const registerRestaurateurPayload = await request.validate(RegisterRestaurateurValidator)

  }


  // public async show({}: HttpContextContract) {}

  // public async edit({}: HttpContextContract) {}

  // public async update({}: HttpContextContract) {}

  // public async destroy({}: HttpContextContract) {}
}
