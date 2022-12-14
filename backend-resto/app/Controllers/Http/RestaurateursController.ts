import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Mail from '@ioc:Adonis/Addons/Mail'
import Restaurant from 'App/Models/Restaurant'
import RestaurateurCompleteRegistrationValidator from 'App/Validators/RestaurateurCompleteRegistrationValidator'

export default class RestaurateursController {
  public async index({ response }: HttpContextContract) {

    const restaurateurs = await User
      .query()
      .where('role_id', 6)
      .preload('restaurant')
      .preload('role')

    return response.send({
      data: restaurateurs,
      message: 'Listes des restaurateurs'
    })
  }

  // public async create({ }: HttpContextContract) { }

  // public async store({ }: HttpContextContract) { }

  public async show({ response, params }: HttpContextContract) {
    const restaurateur = await User.findOrFail(params.id)

    await restaurateur.load('restaurant')
    await restaurateur.load('role')

    return response.send({
      data: restaurateur,
      message: "Détails d'un restaurateur"
    })
  }

  public async validateRestaurateur({ auth, request, response, params }: HttpContextContract) {
    const restaurateur = await User.findOrFail(params.id)
    const restaurant = await Restaurant.findOrFail(restaurateur.id)

    restaurateur.is_verified = true
    restaurant.is_verified = true

    restaurateur.save()
    restaurant.save()

    // Envoie d'un mail pour notifier le restaurateur de la validation de son compte
    await Mail.sendLater((message) => {
      message
        .from('no-reply@resto-up.com')
        .to(restaurateur.email)
        .subject('New user validated from dashboard')
        .htmlView('emails/new_user_validated_from_dashboard', { restaurateur })
    })

    return response.send({
      data: restaurateur,
      message: 'Restaurateur validé avec succès'
    })
  }

  public async completeRegistration({ auth, request, response }: HttpContextContract) {
    const restaurateurCompleteRegistrationPayload = await request.validate(RestaurateurCompleteRegistrationValidator)

    const piece_identite_gerant = request.file('piece_identite_gerant')

    await piece_identite_gerant?.moveToDisk('./uploads/piece_identite_gerant_restaurant/')

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

  // public async edit({ }: HttpContextContract) { }

  // public async update({ }: HttpContextContract) { }

  // public async destroy({ }: HttpContextContract) { }
}
