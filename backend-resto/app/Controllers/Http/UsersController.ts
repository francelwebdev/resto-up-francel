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
import { DateTime } from "luxon";
import Mail from '@ioc:Adonis/Addons/Mail'

export default class UsersController {

  public async validateUser({ auth, request, response, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    user.is_verified = true
    user.save()

    // Envoie d'un mail pour notifier l'utilisateur de la validation de son compte

    return response.send({
      data: user,
      message: 'Utilisateur validé avec succès'
    })
  }

  public async verifyOtpCode({ auth, request, response }: HttpContextContract) {
    const verifyOtpCodePayload = await request.validate(VerifyOtpCodeValidator)

    const user = await User.findByOrFail('code_otp', verifyOtpCodePayload.code_otp)

    if (DateTime.now() > DateTime.fromISO(user.code_otp_expire_at)) {
      return response.status(400).send({
        message: 'Code OTP expiré'
      })
    }

    user.code_otp = null
    await user.save()

    const token = await auth.use('api').generate(user)

    return response.send({
      data: { user, token },
      message: 'Utilisateur authentifié avec succès'
    })
  }

  public async logout({ auth, request, response }: HttpContextContract) {
    await auth.use('api').revoke()

    return {
      //  revoked: true,
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
      .firstOrFail()

    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized('Invalid credentials')
    }

    const token = await auth.use('api').generate(user)

    return response.send({
      data: { user, token },
      message: 'Utilisateur authentifié avec succès'
    })
  }

  public async register({ auth, request, response }: HttpContextContract) {
    const registerUserPayload = await request.validate(RegisterUserValidator)

    const role = await Role.findOrFail(registerUserPayload.role_id)

    const defaultPassword = Math.random().toString(36).slice(-8)

    const user = new User()
    user.email = registerUserPayload.email
    user.password = defaultPassword
    user.nom = registerUserPayload.nom
    user.prenom = registerUserPayload.prenom
    user.numero_de_telephone = registerUserPayload.numero_de_telephone
    user.imei_du_telephone = registerUserPayload.imei_du_telephone
    user.indicatif_telephonique = registerUserPayload.indicatif_telephonique
    await user.related('role').associate(role)
    await user.save()

    // Envoie de mail à l'utilisateur nouvellement crée
    await Mail.sendLater((message) => {
      message
        .from('no-reply@resto-up.com')
        .to(user.email)
        .subject('New created user from dashboard')
        .htmlView('emails/new_created_user_from_dashboard', { user, defaultPassword })
    })

    return response.send({
      data: user,
      message: 'Utilisateur enregistré avec succès'
    })
  }

  public async loginRestaurateur({ request, response }: HttpContextContract) {
    const loginRestaurateurPayload = await request.validate(LoginRestaurateurValidator)

    const role = await Role.findByOrFail('name', 'Restaurateur')

    const user = await User
      .query()
      .where('numero_de_telephone', loginRestaurateurPayload.numero_de_telephone)
      .where('role_id', role.id)
      .firstOrFail()

    const otpCode = Math.floor(1000 + Math.random() * 9000)

    user.code_otp = otpCode
    await user.save()

    //  Envoie de code à 4 chiffre par SMS.

    return response.send({
      data: user,
      message: 'Restaurateur'
    })
  }

  public async registerRestaurateur({ request, response }: HttpContextContract) {
    const registerRestaurateurPayload = await request.validate(RegisterRestaurateurValidator)

    const role = await Role.findOrFail(registerRestaurateurPayload.role_id)

    const otpCode = Math.floor(1000 + Math.random() * 9000)

    const user = new User()
    user.numero_de_telephone = registerRestaurateurPayload.numero_de_telephone
    user.imei_du_telephone = registerRestaurateurPayload.imei_du_telephone
    user.indicatif_telephonique = registerRestaurateurPayload.indicatif_telephonique
    user.code_otp = otpCode
    user.code_otp_expire_at = DateTime.now().plus({ minutes: 5 }).toISO()

    await user.related('role').associate(role)
    await user.save()

    //  Envoie de code à 4 chiffre par SMS.

    return response.send({
      data: { user, otpCode },
      message: 'Restaurateur inscrit avec succès'
    })
  }

  public async restaurateurCompleteRegistration({ auth, request, response }: HttpContextContract) {
    const restaurateurCompleteRegistrationPayload = await request.validate(RestaurateurCompleteRegistrationValidator)

    const piece_identite_gerant = request.file('piece_identite_gerant')

    await piece_identite_gerant?.moveToDisk('./uploads/piece_identite_gerant/')

    const piece_identite_gerant_fileName = piece_identite_gerant?.fileName

    const restaurateur = await User.findOrFail(auth.user?.id)

    const restaurant = new Restaurant()
    restaurant.raison_social = restaurateurCompleteRegistrationPayload.raison_social
    restaurant.siret = restaurateurCompleteRegistrationPayload.siret
    restaurant.adresse = restaurateurCompleteRegistrationPayload.adresse
    restaurant.nom_gerant = restaurateurCompleteRegistrationPayload.nom_gerant
    restaurant.prenom_gerant = restaurateurCompleteRegistrationPayload.prenom_gerant
    restaurant.email_de_contact = restaurateurCompleteRegistrationPayload.email_de_contact
    restaurant.piece_identite_gerant = piece_identite_gerant_fileName
    await restaurant.related('proprietaire').associate(restaurateur)
    await restaurant.save()

    return response.send({
      data: restaurant,
      message: 'Restaurateur inscrit avec succès'
    })
  }

}
