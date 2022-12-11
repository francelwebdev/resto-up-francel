import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'
import RegisterRestaurateurValidator from 'App/Validators/RegisterRestaurateurValidator'
import LoginUserValidator from 'App/Validators/LoginUserValidator'
import LoginRestaurateurValidator from 'App/Validators/LoginRestaurateurValidator'
import VerifyOtpCodeValidator from 'App/Validators/VerifyOtpCodeValidator'
import RestaurateurCompleteRegistrationValidator from 'App/Validators/RestaurateurCompleteRegistrationValidator'
import Role from 'App/Models/Role'
import User from 'App/Models/User'
import Restaurant from 'App/Models/Restaurant'
import Hash from '@ioc:Adonis/Core/Hash'


export default class UsersController {
  // public async index({}: HttpContextContract) {}

  // public async create({}: HttpContextContract) {}

  public async validateUser({ auth, request, response, params }: HttpContextContract) {

  }

  public async verifyOtpCode({ auth, request, response }: HttpContextContract) {
    const verifyOtpCodePayload = await request.validate(VerifyOtpCodeValidator)
  }

  public async logout({ auth, request, response }: HttpContextContract) {
    await auth.use('api').revoke()

    return {
      revoked: true,
      message: 'Déconnecté avec succès'
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const loginUserPayload = await request.validate(LoginUserValidator)

    const email = loginUserPayload.email
    const password = loginUserPayload.password

    const user = await User
      .query()
      .where('email', email)
      .where('password', password)
      .firstOrFail()

    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized('Invalid credentials')
    }

    const token = await auth.use('api').generate(user)

    return response.send({
      user: user,
      token: token
    })
  }

  public async register({ auth, request, response }: HttpContextContract) {
    const registerUserPayload = await request.validate(RegisterUserValidator)

    const role = await Role.findOrFail(registerUserPayload.role_id)

    const user = new User()
    user.email = registerUserPayload.email
    user.password = registerUserPayload.password
    user.nom = registerUserPayload.nom
    user.prenom = registerUserPayload.prenom
    user.numero_de_telephone = registerUserPayload.numero_de_telephone
    user.imei_du_telephone = registerUserPayload.imei_du_telephone
    user.indicatif_telephonique = registerUserPayload.indicatif_telephonique
    await user.related('role').associate(role)
    await user.save()

    return response.send({

    })
  }

  public async loginRestaurateur({ request, response }: HttpContextContract) {
    const loginRestaurateurPayload = await request.validate(LoginRestaurateurValidator)

  }

  public async registerRestaurateur({ request, response }: HttpContextContract) {
    const registerRestaurateurPayload = await request.validate(RegisterRestaurateurValidator)

    const role = await Role.findOrFail(registerRestaurateurPayload.role_id)

    const user = new User()
    user.numero_de_telephone = registerRestaurateurPayload.numero_de_telephone
    user.imei_du_telephone = registerRestaurateurPayload.imei_du_telephone
    user.indicatif_telephonique = registerRestaurateurPayload.indicatif_telephonique
    await user.related('role').associate(role)
    await user.save()

    return response.send({
      data: user,
      message: 'Restaurateur inscrit avec succès'
    })
  }

  public async restaurateurCompleteRegistration({ auth, request, response }: HttpContextContract) {
    const restaurateurCompleteRegistrationPayload = await request.validate(RestaurateurCompleteRegistrationValidator)

    const restaurateur = await User.findOrFail(auth.user?.id)

    const restaurant = new Restaurant()
    restaurant.raison_social = restaurateurCompleteRegistrationPayload.raison_social
    restaurant.siret = restaurateurCompleteRegistrationPayload.siret
    restaurant.adresse = restaurateurCompleteRegistrationPayload.adresse
    restaurant.nom_gerant = restaurateurCompleteRegistrationPayload.nom_gerant
    restaurant.prenom_gerant = restaurateurCompleteRegistrationPayload.prenom_gerant
    restaurant.email_de_contact = restaurateurCompleteRegistrationPayload.email_de_contact
    restaurant.piece_identite_gerant = restaurateurCompleteRegistrationPayload.piece_identite_gerant
    await restaurant.related('proprietaire').associate(restaurateur)
    await restaurant.save()

    return response.send({
      data: await restaurant.related('proprietaire').query(),
      message: 'Restaurateur inscrit avec succès'
    })
  }


}
